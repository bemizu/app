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
  refreshOrg: async ( session ) => {
    const { data, error } = await session.supabase
        .from("organizations")
        .select(
          ` 
          id,      
          name,
          username, 
          website,
          overview,
          culture,
          logo,
          businessSize, 
          industry,
          locations (
            id,
            title,
            line1,
            line2,
            city,
            state,
            zip,
            oid
          ),
          jobs (
            id, 
            title, 
            oid,
            lid,
            description, 
            salaryMin, 
            salaryMax, 
            salaryType
          ),
          team_members (
            id, 
            title, 
            name, 
            email, 
            image, 
            phone
          )

            `
        )
        .eq("id", session.organization.id);

        if ( !error ) {
          set(state => ({ organization: data[0] }))
          return data[0]
        } else {
          console.log( error )
          return null;
        }

    
  }
  
}))


export default Session;