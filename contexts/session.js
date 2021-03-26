import create from 'zustand'

const Session = create(set => ({
  loading: true,
  user: undefined,
  profile: undefined,
  supabase: undefined,
  organization: undefined,
  setUser: ( user ) => set(state => ({ user })),
  setProfile: ( profile ) => set(state => ({ profile })),
  setOrganization: ( organization ) => set(state => ({ organization })),
  setSupabase: ( supabase ) => set(state => ({ supabase })),
  setLoadingFalse: (  ) => set(state => ({ loading: false })), 
  
}))


export default Session;