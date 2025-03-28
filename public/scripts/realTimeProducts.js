const socket = io();

// Manejo del formulario para agregar productos en tiempo real
document.querySelector("#productForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const thumbnails = [document.querySelector("#thumbnail").value]; // Ahora es un array
    const price = parseFloat(document.querySelector("#price").value); // Convertir a número
    const stock = parseInt(document.querySelector("#stock").value); // Convertir a número

    if (!title || !category || thumbnails.length === 0 || !price || !stock) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const newProduct = { title, category, thumbnails, price, stock };

    socket.emit("newProduct", newProduct);

    // Limpiar el formulario después de enviar
    document.querySelector("#productForm").reset();
});

// Escuchar la actualización de productos
socket.on("products", (products) => {
    if (!Array.isArray(products)) {
        console.error("Error: El servidor no envió un array de productos", products);
        return;
    }

    const productList = document.querySelector("#productList");
    productList.innerHTML = products.map((p) => {
        const imageUrl = p.thumbnails && p.thumbnails.length > 0 ? p.thumbnails[0] : "/images/default.jpg";

        return `<li>
            <img src="${imageUrl}" alt="${p.title}" width="100" onerror="this.src='/images/default.jpg';">
            <strong>${p.title}</strong> - $${p.price} - Stock: ${p.stock}
        </li>`;
    }).join("");
});
