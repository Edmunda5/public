$("#login-form").on("submit", (e) => {
  e.preventDefault();

  const email = $("#login-email").val();
  const password = $("#login-password").val();

  const user = {
    email,
    password,
  };

  console.log(user);

  fetch("/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        $("#error-msg").fadeIn();
        $("#error-msg").text(data.msg);
      } else {
        $("#error-msg").fadeOut();
        window.localStorage.setItem("auth-token", data.token);
        window.location = "/user_groups";
      }
    });
});
