const apiKey = 'f66d2b791fd84ac8a1879a6c1049231f';
//f66d2b791fd84ac8a1879a6c1049231f
//61eae65de0c74ece9f8194c44fc3d064
let apiUrl;

// Função para buscar e exibir artigos
async function search() {
    let search = document.getElementById("searchInput").value;
    console.log(search);
    apiUrl = `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados: ' + response.statusText);
        }
        const data = await response.json();
        const articlesContainer = document.getElementById('articles-container');
        articlesContainer.innerHTML = ''; // Limpa o conteúdo anterior antes de adicionar novos artigos

        data.articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            articleElement.innerHTML = `


            <section>
                <article>
                    <div class="group-hover:scale-125 group overflow-hidden relative text-gray-50 rounded-2xl 2xl:rounded-3xl hover:duration-700 duration-700 w-full aspect-square">
                        <div class="w-full aspect-square text-gray-800">
                        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="w-full h-full aspect-square group-hover:blur-sm object-cover scale-125 bg-slate-400 dark:bg-zinc-800">` : ''}
                        </div>
                        <div class="absolute bg-black bg-opacity-50 -bottom-24 w-full group-hover:aspect-square p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                            <span class="text-white font-bold text-xl 2xl:text-2xl Inter-Tight hidden group-hover:flex md:mt-14">${article.title}</span>
                            <span class="text-white font-bold text-xs 2xl:text-xl hidden group-hover:flex Roboto-Mono">${article.author}</span>
                            <span class="text-white font-bold text-xs 2xl:text-xl hidden group-hover:flex Roboto-Mono">${article.source.name}</span>
                            <span class="text-white font-bold text-sm 2xl:text-xl hidden group-hover:flex Roboto-Mono">${new Date(article.publishedAt).toLocaleString()}</span>
                            <p class="text-white hidden text-xs 2xl:text-xl group-hover:flex Roboto-Mono md:mt-5 xl:mt-10">${article.content}</p>
                            <a href="${article.url}" target="_blank" class="bg-white text-black w-24 rounded-full Roboto-Mono text-center text-base -tracking-widest p-1 mt-auto ms-auto m-3 hover:bg-black hover:text-white shadow-sm hover:shadow-white">Leia mais</a>
                        </div>
                    </div>
                </article>
            </section>`;

            articlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}