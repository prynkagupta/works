  const key = "flkYQi1qgrqyWXbIv3HdyIy7HUNQD_WY8oWdO56vP2U";
        const box = document.getElementById("search-box");
        const grid = document.getElementById("search-result");
        const more = document.getElementById("load-more");
        const modal = document.getElementById("image-modal");
        const mImg = document.getElementById("modal-img");
        const mDl = document.querySelector(".modal-dl");
        const close = document.querySelector(".close-btn");

        let query = "";
        let page = 1;
        let activeImg = null;
        let timer;

        document.getElementById("year").textContent = new Date().getFullYear();

        async function download(url, id) {
            const res = await fetch(url);
            const blob = await res.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `prix-pu-${id}.png`;
            link.click();
        }

        async function load() {
            let url = query 
                ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${key}&per_page=12`
                : `https://api.unsplash.com/photos?page=${page}&client_id=${key}&per_page=12`;

            const res = await fetch(url);
            const data = await res.json();
            const list = query ? data.results : data;

            if (page === 1) grid.innerHTML = "";

            list.forEach(item => {
                const card = document.createElement("div");
                card.className = "img-card";
                card.innerHTML = `
                    <img src="${item.urls.small}">
                    <div class="overlay">
                        <span>@${item.user.username}</span>
                        <button class="dl-btn">Save</button>
                    </div>
                `;

                card.onclick = () => {
                    activeImg = item;
                    mImg.src = item.urls.regular;
                    modal.style.display = "flex";
                };

                card.querySelector(".dl-btn").onclick = (e) => {
                    e.stopPropagation();
                    download(item.urls.full, item.id);
                };

                grid.appendChild(card);
            });

            more.style.display = list.length > 0 ? "block" : "none";
        }

        box.addEventListener("input", (e) => {
            query = e.target.value;
            clearTimeout(timer);
            timer = setTimeout(() => {
                page = 1;
                load();
            }, 500);
        });

        more.onclick = () => {
            page++;
            load();
        };

        close.onclick = () => modal.style.display = "none";
        modal.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; };
        mDl.onclick = () => download(activeImg.urls.full, activeImg.id);

        load();