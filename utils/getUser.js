
export async function GetUser( user, session, setProfileUser, setProfileOrganization,  ) {

  const { data, error } = await session.supabase
    .from("business_users")
    .select(
      `
              id,
              email, 
              onboarded, 
              comet,
              fullName
            `
    )
    .eq("email", user.email);

  if (!error && data.length) {

    session.setUser( data[0] );
    setProfileUser( data[0] );

    const orgReq = await session.supabase
      .from("organizations")
      .select(
        ` 
              id,      
              name,
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
      .eq("uuid", data[0].id);

      if (!orgReq.error && orgReq.data.length) {
        session.setOrganization( orgReq.data[0] );
        setProfileOrganization( orgReq.data[0] );

        
      } else {
        console.log( orgReq.error );
      }
    
  } else {
      console.log( error );
    // router.push("/");
  }
}
