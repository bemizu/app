import create from 'zustand'

const Session = create(set => ({
  loading: true,
  user: undefined,
  profile: undefined,
  setUser: ( user ) => set(state => ({ user })),
  setProfile: ( profile ) => set(state => ({ profile })),
  setLoadingFalse: (  ) => set(state => ({ loading: false })), 
}))


export default Session;