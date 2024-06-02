document.addEventListener("DOMContentLoaded", () => {
    // Function to handle the "Add Another Category" button
    document.getElementById("add_button").addEventListener("click", () => {
        const newCategory = prompt("Enter new category name:");
       
        if (newCategory) {
            const newAmount = prompt("Enter amount for " + newCategory + ":");
            if (newAmount) {
                addCategory(newCategory, newAmount);
            }
        }
    });

    // Function to handle update buttons
    document.querySelectorAll("#update").forEach(button => {
        button.addEventListener("click", (event) => {
            const categoryDiv = event.target.parentElement;
            const categoryName = categoryDiv.querySelector("div").textContent.trim();
            const newAmount = prompt("Enter new amount for " + categoryName + ":");
            if (newAmount) {
                categoryDiv.querySelector(".rm-amount span").textContent = "RM " + newAmount;
            }
        });
    });
});

function addCategory(name, amount) {
    const container = document.createElement("div");
    container.className = "container";

    const categoryDiv = document.createElement("div");
    categoryDiv.textContent = name;
    container.appendChild(categoryDiv);

    const amountDiv = document.createElement("div");
    amountDiv.className = "rm-amount";
    amountDiv.innerHTML = `<span>RM ${amount}</span>`;
    container.appendChild(amountDiv);

    const updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.id = "update";
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => {
        const newAmount = prompt("Enter new amount for " + name + ":");
        if (newAmount) {
            amountDiv.querySelector("span").textContent = "RM " + newAmount;
        }
    });
    container.appendChild(updateButton);

    document.querySelector(".main-page").appendChild(container);
}
