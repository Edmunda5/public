$("#group-create-form").on("submit", (e) => {
  e.preventDefault();

  const name = $("#group-name").val();

  const group = {
    name,
    token: localStorage.getItem("auth-token"),
  };

  fetch("/groups", {
    method: "POST",
    body: JSON.stringify(group),
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
      }
    });
});

$("#join-group-form").on("submit", (e) => {
  e.preventDefault();
  let groupId = $("#group-id").val();

  const group = {
    groupId,
    token: localStorage.getItem("auth-token"),
  };

  fetch("/accounts", {
    method: "POST",
    body: JSON.stringify(group),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        $("#error-msg").fadeIn();
        $("#error-msg").text(data.msg);
      } else {
        $("#error-msg").fadeOut();
      }
    });
});

$(() => {
  fetch("/accounts", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("accounts", data);
      if (data.error) {
        $("#error-msg").fadeIn();
        $("#error-msg").text(data.msg);
        if (data.authFailed) {
          localStorage.removeItem("auth-token");
          window.location = "/login";
        }
      } else {
        $("#error-msg").fadeOut();
        data.groups.forEach((group) => {
          $("#groups-list").append(`
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center">${group.name}</h5>
                                <a href="/group/${group.id}" class="btn btn-primary">View</a>
                            </div>
                        </div>
                    `);
        });
      }
    });

  fetch("/groups", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("groups", data);
      if (data.error) {
        $("#error-msg").fadeIn();
        $("#error-msg").text(data.msg);
        if (data.authFailed) {
          localStorage.removeItem("auth-token");
          window.location = "/login";
        }
      } else {
        data.groups.forEach((group) => {
          console.log(group);
          $("#group-id").append(`
                        <option value="${group.id}">${group.name} [${group.id}]</option>
                    `);
        });
      }
    });
});
