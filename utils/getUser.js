
export async function GetUser( user, session, setProfileUser, setProfileOrganization ) {

  const { data, error } = await session.supabase
    .from("business_users")
    .select(
      `
              id,
              email, 
              onboarded
            `
    )
    .eq("email", user.email);

  if (!error && data.length) {

    session.setUser(data[0]);
    setProfileUser( data[0] );

    const orgReq = await session.supabase
      .from("organizations")
      .select(
        `
              name,
              website,
              overview,
              culture,
              logo
            `
      )
      .eq("uuid", data[0].id);

      if (!orgReq.error && orgReq.data.length) {
        session.setOrganization(orgReq.data[0]);
        setProfileOrganization( orgReq.data[0] );
      } else {
        console.log( orgReq.error );
      }
    
  } else {
      console.log( error );
    // router.push("/");
  }
}