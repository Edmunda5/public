$("#register-form").on("submit", (e) => {
  e.preventDefault();

  const name = $("#reg-name").val();
  const email = $("#reg-email").val();
  const password = $("#reg-password").val();
  const password2 = $("#reg-password2").val();

  if (password !== password2) {
    $("#error-msg").fadeIn();
    $("#error-msg").text("Passwords do not match");
    return;
  }

  const user = {
    email,
    password,
    name,
  };

  console.log(user);

  fetch("/register", {
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
        window.location = "/login";
      }
    });
});
