const button = document.querySelector("#button-load-more");
const gallery = document.querySelector("#gallery");

let imageIndex = 1;
button.onclick = async (e) => {
    let done = false;
    let imageLoaded = 0;

    do {
        await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${imageIndex}`)
            .then(response => response.json())
            .then(result => {
                imageIndex++;
                if (!result.primaryImage) {
                    done = false;
                    return;
                }

                imageLoaded++;
                createPicture(result.primaryImage);
            });

        if (imageLoaded == 8) done = true;
        else done = false;
    } while (!done);
}

const createPicture = (url) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = url;

    div.appendChild(img);
    gallery.appendChild(div);

    // scroll to bottom
    div.scrollIntoView({ behavior: 'smooth', block: 'start' });
}