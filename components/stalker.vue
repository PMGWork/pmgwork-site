<template>
    <div>
        <div id="stalker" class="stalker">
            <div class="stalker-item"></div>
        </div>
    </div>
</template>

<script>
export default {
    mounted(){
        const stalker = document.getElementById("stalker");

        if (window.matchMedia( "(pointer: fine)" ).matches) {
            let mPos = {
                x: document.documentElement.clientWidth / 2,
                y: document.documentElement.clientHeight / 2
            };
            let sPos = {
                x: document.documentElement.clientWidth / 2,
                y: document.documentElement.clientHeight / 2
            };

            document.addEventListener("mousemove", e => {
                mPos.x = e.clientX;
                mPos.y = e.clientY;
            });

            requestAnimationFrame(sPosUpdate);

            function sPosUpdate() {
                sPos.x += (mPos.x - sPos.x) * 0.8;
                sPos.y += (mPos.y - sPos.y) * 0.8;

                stalker.style.transform = "translate3d(" + sPos.x + "px," + sPos.y + "px, 0";

                requestAnimationFrame(sPosUpdate);
            }
        } else {
            stalker.style.display = "none";
        }
    },
}
</script>