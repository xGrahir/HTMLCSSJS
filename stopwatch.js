const time = document.querySelector('.time')
const brush = document.querySelector('.brush')
const colors = document.querySelector('.colors')
const helpBtn = document.querySelector('.helpBtn')
const helpList = document.querySelector('.help')
const voiceOnBtn = document.querySelector('.voice-on')
const voiceOffBtn = document.querySelector('.voice-off')
const green = document.querySelector('.green')
const orange = document.querySelector('.orange')
const blue = document.querySelector('.blue')
const choseColor = document.querySelector('.chose')
const btns = document.querySelectorAll('.btn')
const saved = document.querySelector('.saved-times')
const lastTime = document.querySelector('.last-time')
const audio = new Audio('/static/sound/ticktack4.wav')
let interval = null
let miliseconds = 0
let i = 0


const countTime = () => {
	miliseconds += 10
	let hours = Math.floor((miliseconds / 3600000) % 60)
	let minutes = Math.floor((miliseconds / 60000) % 60)
	let seconds = Math.floor((miliseconds / 1000) % 60)
	let mili = Math.floor((miliseconds % 1000) / 10)

	if(!voiceOnBtn.classList.contains('voice-on-hide')){
		audio.play()
	}

	if (mili < 10) {
		mili = `0${mili}`
	}

	if (seconds < 10) {
		seconds = `0${seconds}`
	}

	if (minutes < 10) {
		minutes = `0${minutes}`
	}

	if (hours < 10) {
		hours = `0${hours}`
	}

	if (hours>=1) {
		time.innerHTML = `${hours}:${minutes}:${seconds}:${mili}`
	} else {
		time.innerHTML = `${minutes}:${seconds}:${mili}`
	}
	
}

const menageButtons = e => {
	let btnClass = e.target.classList[0]
	if (btnClass == 'play') {
		if (interval) return

        e.target.classList.add('btn-active')
        e.target.nextElementSibling.classList.remove('btn-active')
		interval = setInterval(countTime, 10)
	}

	if (btnClass == 'stop') {
        if (!interval) return

		audio.pause()
		clearInterval(interval)
		interval = null
        e.target.classList.add('btn-active')
        e.target.previousElementSibling.classList.remove('btn-active')
	}

	if (btnClass == 'reset') {
		clearInterval(interval)
		interval = null

        if (time.innerHTML != "00:00:00") {
            i += 1
            const parag = document.createElement('p')
		    const pinside = saved.firstElementChild
            saved.lastElementChild.textContent = ""
		    parag.innerHTML= `Pomiar nr ${i}: &nbsp&nbsp&nbsp&nbsp<span>${time.innerHTML}</span>`
		    saved.insertBefore(parag, pinside)
            lastTime.textContent = `Ostatni czas ${time.textContent}`
        }

		// Max 10 score in the archive
        if (i > 9) {
            saved.lastElementChild.remove()
        }

        miliseconds = 0
		time.textContent = '00:00:00'
		audio.pause()
		audio.currentTime = 0
        btns.forEach(btn => btn.classList.remove('btn-active'))

	}

    if (btnClass == "xbtn") {
        i = 0
        saved.innerHTML = "<p>Nie masz żadnych zapisanych czasów</p>"
        lastTime.textContent = ""
    }

    if (btnClass == "archive") {
        saved.classList.toggle('saved-times-show')
    }
}



// LISTENERS
btns.forEach(btn => btn.addEventListener('click', menageButtons))
helpBtn.addEventListener('click', () => {
	helpList.classList.toggle('help-show')
	helpBtn.style.zIndex = "100"
})

brush.addEventListener('click', () => {
	colors.classList.toggle('colors-show')
})

voiceOnBtn.addEventListener('click', () => {
	voiceOnBtn.classList.add('voice-on-hide')
	voiceOffBtn.classList.add('voice-off-show')
	audio.volume = 0
})

voiceOffBtn.addEventListener('click', () => {
	voiceOnBtn.classList.remove('voice-on-hide')
	voiceOffBtn.classList.remove('voice-off-show')
	audio.volume = 1
})

green.addEventListener('click', () => {
	document.documentElement.style.setProperty('--main-orange', '#079d16')
	choseColor.value = '#079d16';
})

orange.addEventListener('click', () =>{
	document.documentElement.style.setProperty('--main-orange', '#ff4d00')
	choseColor.value = '#ff4d00';
})

blue.addEventListener('click', () =>{
	document.documentElement.style.setProperty('--main-orange', '#002aff')
	choseColor.value = '#002aff';
})

choseColor.addEventListener('change', () => {
	document.documentElement.style.setProperty('--main-orange', `${choseColor.value}`)
})
