$("#bill-add-form").on("submit", (e) => {
  e.preventDefault();
  const url = window.location.pathname;
  const groupId = url.substring(url.lastIndexOf("/") + 1);

  const bill = {
    description: $("#bill-description").val(),
    amount: $("#bill-amount").val(),
    groupId,
    token: localStorage.getItem("auth-token"),
  };

  console.log(bill);
  fetch("/bills", {
    method: "POST",
    body: JSON.stringify(bill),
    headers: {
      "content-type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
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
  const url = window.location.pathname;
  const groupId = url.substring(url.lastIndexOf("/") + 1);

  fetch(`/bills/${groupId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        $("#error-msg").fadeIn();
        $("#error-msg").text(data.msg);
        if (data.authFailed) {
          localStorage.removeItem("auth-token");
          window.location = "/login";
        }
      } else {
        $("#error-msg").fadeOut();
        data.bills.forEach((bill) => {
          $("#bills-list").append(`
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-8">
                                    <h5>${bill.description}</h5>
                                </div>
                                <div class="col-4">
                                    <h5>$${bill.amount}</h5>
                                </div>
                            </div>
                        </li>
                    `);
        });
      }
    });
});
