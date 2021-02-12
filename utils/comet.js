// let apiKey = "15b4f27dd5915a3e741899f2d7d706874d024324";
// var appID = "29564ebfb14d2c5";
// var region = "us";
// var appSetting = new CometChat.AppSettingsBuilder()
//   .subscribePresenceForAllUsers()
//   .setRegion(region)
//   .build();
// CometChat.init(appID, appSetting).then(
//   () => {
//     console.log("Initialization completed successfully");
//     // You can now call login function.
//   },
//   (error) => {
//     console.log("Initialization failed with error:", error);
//     // Check the reason for error and take appropriate action.
//   }
// );

export function signUp(session, apiKey, comet) {
  var user = new comet.User(session.user.userId);
  user.setName(session.user.profile.fullName);

  comet.createUser(user, apiKey).then(
    (user) => {
      console.log("user created", user);
    },
    (error) => {
      console.log("error", error);
    }
  );
}

export function login(session, apiKey, comet) {
  comet.login(session.user.userId, apiKey).then(
    (user) => {
      console.log("Login Successful:", { user });
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
}
