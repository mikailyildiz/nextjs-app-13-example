import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { EntityState, createEntityAdapter } from '@reduxjs/toolkit'



export interface User {
  id:number
  email: string
  name: {
    firstname:string
    lastname:string
  },
}

export interface TokenResponse {
  token: string
}
export interface UserResponse {
  user: User
}

export interface LoginRequest {
  username: string
  password: string
}

export type Channel = 'redux' | 'general'

export interface Message {
  id: number
  channel: Channel
  userName: string
  text: string
}



/*
  createEntityAdapter: Belirli bir veri nesnesi türünün örneklerini içeren normalized state yapısı üzerinde 
  CRUD işlemleri gerçekleştirmek için bir dizi önceden oluşturulmuş reducers ve selectors oluşturan bir işlev.
  daha fazla bilgi https://redux-toolkit.js.org/api/createEntityAdapter
  örnek: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#normalizing-data-with-createentityadapter
*/
const messagesAdapter = createEntityAdapter<Message>()

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
    prepareHeaders: (headers, {getState})=> {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUser: builder.query<UserResponse, Number>({
      query: (id) => `users/${id}`
    }),


    //start Streaming Updates Real-time chat applications
    getMessages: builder.query<EntityState<Message>, Channel>({
      //query ilk verileri getirme
      query: (channel) => `messages/${channel}`,

      //transformResponse: bir sorgu veya mutasyon tarafından döndürülen verilerin önbelleğe ulaşmadan önce değiştirilmesi
      transformResponse(response: Message[]) {

        //addMany: Record<EntityId, T> şeklinde bir entity dizisini veya bir nesneyi kabul eder ve henüz mevcut değilse bunları ekler.
        //createEntityAdapter tüm CRUD işlemleri için: https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions
        return messagesAdapter.addMany(
          
          //getInitialState: {ids: [], entities: {}} gibi yeni bir entity state nesnesi döndürür 
          messagesAdapter.getInitialState(),
          response
        )
      },

      /*
        onCacheEntryAdded Bir query için streaming updates etkinleştirmek üzere, 
        streamed data alındığında query nin nasıl güncelleneceğine ilişkin mantık da dahil olmak üzere 
        asynchronous funtion ı query ye iletilir.

        onCacheEntryAdded lifecycle callback, RTK Query cache ine yeni bir cache entry 
        eklendikten sonra isteğe bağlı yürütülecek async logic yazmanıza izin verir.
      */
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket('ws://localhost:8080')
        try {


          //cacheDataLoaded: ilk verinin ne zaman getirildiğini belirleyecek
          //İlk query yanıtı alındığında, önbellek yanıt verileriyle doldurulacak ve cacheDataLoaded promise çözülecektir
          await cacheDataLoaded

          //CacheDataLoaded promise bekledikten sonra, ilişkili bir mesaj alındığında önbellek verilerini güncelleyen message event listener WebSocket bağlantısına eklenecektir. 
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)

            //if (!isMessage(data) || data.channel !== arg) return

            updateCachedData((draft) => {
              /*
                upsertOne: tek bir varlığı kabul eder. Bu kimliğe sahip bir entity varsa, yüzeysel bir güncelleme gerçekleştirir 
                ve belirtilen alanlar, mevcut değerlerin üzerine yazan tüm eşleşen alanlar ile mevcut varlıkla birleştirilir. 
                Entity yoksa, eklenecektir.
              */
              messagesAdapter.upsertOne(draft, data)
            })
          }

          ws.addEventListener('message', listener)
        } catch {}


        //cacheEntryRemoved: herhangi bir server connections ı ne zaman temizleyeceğinizi öğrenebilirsiniz.
        //cacheEntryRemoved önbellek aboneliği artık etkin olmadığında çözecektir.
        /*
          Verilere daha fazla aktif subscriptions olmadığında (örneğin, subscribed olunan bileşenler yeterli bir süre boyunca 
          bağlantısız kaldığında), cacheEntryRemoved promise çözülerek kalan kodun çalışmasına 
          ve websocket bağlantısını kapatmasına izin verilir. RTK Query ayrıca ilişkili verileri önbellekten kaldıracaktır. 
        */
        await cacheEntryRemoved
        ws.close()

      },
    }),



    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  })
})

export const { useLoginMutation, useGetUserQuery, useGetMessagesQuery } = api