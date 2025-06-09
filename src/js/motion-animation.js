import { animate, transform, scroll, inView, press } from "motion";

// input counter animation
try {
    const maxLength = 10
    const input = document.getElementById("question")
    const counter = document.getElementById("counter")

    // Create transform functions outside the event handler
    const mapRemainingToColor = transform([0, 10], ["#d2d2d2", "#c69978"])
    const mapRemainingToSpringVelocity = transform([0, 10], [50, 0])

    // Set initial state
    counter.style.willChange = "transform"

    input.addEventListener("input", () => {



        let charactersRemaining = maxLength - input.value.length
        if (charactersRemaining < 0) {
            charactersRemaining++;
        } else {
            counter.textContent = charactersRemaining
        }
        counter.style.color = mapRemainingToColor(charactersRemaining)
        if (charactersRemaining <= 10 && charactersRemaining >= 0) {
            animate(
                "#counter",
                { scale: 1 },
                {
                    type: "spring",
                    velocity: mapRemainingToSpringVelocity(charactersRemaining),
                    stiffness: 700,
                    damping: 80,
                }
            )
        }
    })
} catch (e) { }

// fade sections

try {
    // const mediaQuery = window.matchMedia('(min-width: 1200px)');
    // if (mediaQuery.matches) {
    document.querySelectorAll(".container").forEach((item) => {
        scroll(animate(item, { opacity: [0, 1, 1, 1, 1] }), {
            target: item,
            offset: ["start end", "end end", "start start", "end start"],
        })
    })
    // }


} catch (e) { }

try {

    press(".git__img-vase", (element) => {
        animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })

        return () =>
            animate(element, { scale: 1 }, { type: "spring", stiffness: 500 })
    })
} catch (e) { }