import { gsap } from "gsap";

export const inputAppear = () => {
    gsap.to('.input-plus', {
        bottom: 0,
        duration: 1,
        ease: 'Power0.out',
    })
}
export const inputAway = () => {
    gsap.to('.input-plus', {
        bottom: -200,
        duration: 1,
        ease: 'Power0.out',
    })
}
export const inputAway_immdely = () => {
    gsap.set('.input-plus', {
        bottom: -200,
    })
}
export const inputPlus_exist = () => {
    return gsap.utils.selector(".input-plus")
}

export const levelchoiceAway = () => {
    gsap.to('.easy-item', {
        x: -300,
        opacity: 0,
        duration: 1
    })
    gsap.to('.hard-item', {
        x: 300,
        opacity: 0,
        duration: 1
    })
}
export const levelchoiceAppear = () => {
    gsap.to('.easy-item', {
        x: 0,
        opacity: 1,
        duration: 1
    })
    gsap.to('.hard-item', {
        x: 0,
        opacity: 1,
        duration: 1
    })
}

export const addPrgressBar = (val) => {
    gsap.to('.progress-bar-fill', {
        height: `${val}%`,
        duration: 1,

    })
}