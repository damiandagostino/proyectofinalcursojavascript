
const mercadopago = new MercadoPago("TEST-ce3797d4-394e-436b-9fd5-40a9730efa0a", {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  });

  document.getElementById("checkout-btn").addEventListener("click", function () {

    let cantidadEntradas = 0;
    for (let entradas of entradasEnCarrito) {
        cantidadEntradas += entradas.cantidad * entradas.precio ;
    }

    const orderData = {
      quantity: 1,
      description: "Entradas",
      price: cantidadEntradas,
    };
    fetch("http://localhost:8080/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (preference) {
        console.log(preference);
        createCheckoutButton(preference.id);
      })
      .catch(function (error) {
        console.log(error);
        alert("Unexpected error");
      });
  });
  
  function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    const bricksBuilder = mercadopago.bricks();
  
    const renderComponent = async (bricksBuilder) => {
      if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create(
        "wallet",
        "button-checkout", // class/id where the payment button will be displayed
        {
          initialization: {
            preferenceId: preferenceId,
          },
          callbacks: {
            onError: (error) => console.error(error),
            onReady: () => {},
          },
        }
      );
    };
    window.checkoutButton = renderComponent(bricksBuilder);
  }