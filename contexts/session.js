import create from 'zustand'

const Session = create(set => ({
  session: {}, 
  user: undefined, 
  setSession: ( session ) => set(state => ({ session })),
  setUser: ( user ) => set(state => ({ user })),
}))


export default Session;