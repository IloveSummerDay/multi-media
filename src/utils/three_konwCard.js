import * as THREE from 'three';

import TWEEN from 'three/examples/jsm/libs/tween.module';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

const table = [
    'Alan Turing', '提出了图灵机模型和图灵测试，为计算机科学与人工智能奠定了理论基础。', '早期理论阶段', '（20世纪40年代至50年代）', 1,
    'John McCarthy', '引入了术语“人工智能”（Artificial Intelligence）并创办了Dartmouth会议，标志着人工智能领域的正式开始。', '早期研究阶段', '（20世纪50年代至60年代）', 1,
    'Marvin Minsky', '联合John McCarthy创办了MIT人工智能实验室，提出了“知识表示”为基础的人工智能研究方法。', '早期研究阶段', '（20世纪50年代至60年代）', 2,
    'Arthur Samuel', '开创了机器学习领域，提出了“机器学习”（Machine Learning）的概念并应用于自动学习跳棋游戏。', '机器学习的初期发展阶段', '（20世纪50年代至60年代）', 2,
    'Allen Newell', '发展了逻辑推理和问题解决的数学模型，提出了“逻辑理论家”。', '早期研究阶段', '（20世纪50年代至60年代）', 2,
    'George Dantzig', '开发了线性规划和运筹学领域的数学优化方法。', '早期研究阶段', '（20世纪50年代至60年代）', 2,
    'Ray Solomonoff', '提出了“算法性别理论”，为机器学习和人工智能建立了信息论基础。', '早期研究阶段', '（20世纪60年代至70年代）', 2,
    'Judea Pearl', '开发了概率因果图模型，为因果推断和决策论提供了数学基础。', '早期研究阶段', '（20世纪80年代至90年代）', 2,
    'Geoffrey Hinton', '在深度学习领域作出重大贡献，发展了反向传播算法和深度神经网络模型。', '深度学习的发展阶段', '（20世纪80年代至今）', 2,
    'Yann LeCun', '开发了卷积神经网络（CNN）的基本原理，为计算机视觉领域取得突破性成果。', '深度学习的发展阶段', '（20世纪80年代至今）', 2,
    'Andrew Ng', '致力于推动机器学习和深度学习的发展，创办了Coursera等在线教育平台。', '深度学习的发展阶段', '（21世纪初至今）', 3,
    'Fei-Fei Li', '在计算机视觉领域取得突出成果，推动大规模视觉数据集ImageNet和深度学习的应用。', '深度学习的应用阶段', '（21世纪初至今）', 3,
    'Sebastian Thrun', '在机器学习和自动驾驶领域取得重要突破，创办Udacity在线学习平台。', '应用实践和推广阶段', '（21世纪初至今）', 3,
    'Yoshua Bengio', '对深度学习的理论基础和模型设计做出了重要贡献，获得了图灵奖。', '深度学习的发展阶段', '（21世纪初至今）', 3,
    'Elon Musk', '通过创办OpenAI和SpaceX等公司，推动人工智能和太空探索的发展。', '应用实践和推广阶段', '（21世纪初至今）', 3,
    'Demis Hassabis', '创办了DeepMind公司，致力于强化学习和人工智能研究，在围棋等领域取得了突破性成果。', '深度学习与强化学习的交叉应用阶段', '（21世纪初至今）', 3,
    'Ian Goodfellow', '发展了生成对抗网络（GANs）的理论和应用，为图像生成和其他领域的创新做出了贡献。', '深度学习和生成模型的发展阶段', '（21世纪初至今）', 3,
    'Yaniv Erlich', '在人工智能和基因组学领域进行交叉研究，利用大数据和机器学习算法挖掘基因组数据的信息。', '人工智能在生物医学和基因组研究领域的应用阶段', '（21世纪初至今）', 3,
    'Regina Barzilay', '在自然语言处理领域进行研究，应用机器学习和深度学习方法解决自然语言理解和文本生成问题。', '自然语言处理和文本挖掘的应用阶段','（21世纪初至今）', 4,
    'Ian Goodfellow', '发展了生成对抗网络（GANs）的理论和应用，为图像生成和其他领域的创新做出了贡献。', '深度学习和生成模型的发展阶段', '（21世纪初至今）', 4,
    'Pieter Abbeel', '在机器学习和强化学习领域进行研究，开发了深度强化学习算法，并在机器人控制方面取得了重要进展。', '强化学习的应用阶段', '（21世纪初至今）', 4,
    'Yoshua Bengio', '作为深度学习领域的重要人物之一，提出了深度信念网络和深度生成模型的概念。', '深度学习的发展阶段', '（21世纪初至今）', 4,
    'Andrej Karpathy', '研究计算机视觉和自然语言处理领域，特别是在图像描述生成和神经程序生成方面取得了突破性成果。', '深度学习的应用阶段', '（21世纪初至今）', 4,
    'Kai-Fu Lee', '在人工智能产业领域有广泛影响力，创办了SINovation Ventures和Sinovation AI Institute等机构。', '应用实践和推广阶段', '（21世纪初至今）', 4,
    'Ilya Sutskever', '研究人工智能和深度学习，为图像识别和自然语言处理等领域开发了创新的深度学习算法。', '深度学习的应用阶段', '（21世纪初至今）', 4,
    'Rana el Kaliouby', '在情感计算领域开创了先河，致力于将人工智能应用于识别和解释人类情绪的技术。', '情感计算的应用阶段', '（21世纪初至今）', 4,
    'Jeff Dean', '在Google工作期间，领导了TensorFlow等机器学习和人工智能项目。', '应用实践和推广阶段', '（21世纪初至今）', 4,
];

let camera, scene, renderer;
let controls;

const objects = [];
const targets = { sphere: [], helix: [] };

init();
animate();

function init() {

    let container = document.getElementById('container')
    let cardBox = document.getElementById('card-box')
    let width = parseFloat(window.getComputedStyle(container).width)
    let height = parseFloat(window.getComputedStyle(container).height)
    console.log(width, height);

    camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000);
    camera.position.z = 2000;

    scene = new THREE.Scene();

    // create tip
    const tip = document.createElement('p')
    tip.innerHTML = '按下shift点击 可以单独查看~'
    tip.classList.add('tip')
    cardBox.appendChild(tip)

    // table

    for (let i = 0; i < table.length; i += 5) {

        const element = document.createElement('div');
        element.classList.add('element');
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
        element.style.cursor = 'pointer'

        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = table[i];
        element.appendChild(name);

        const time = document.createElement('div');
        time.classList.add('time');
        time.innerHTML = table[i + 2] + '<br>' + table[i + 3];
        element.appendChild(time);

        const achievement = document.createElement('div');
        achievement.classList.add('achievement');
        achievement.innerHTML = table[i + 1];
        element.appendChild(achievement);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;

        scene.add(objectCSS);

        objects.push(objectCSS);
        
        // click
        element.style.userSelect = "auto"
        element.addEventListener('pointerdown', (e) => {
            if(!e.shiftKey) return
            // 响应点击
            console.log('111');
            
            
        })
        // 元素周期表 table位置确定
        // const object = new THREE.Object3D();
        // object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
        // object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

        // targets.table.push( object );

    }


    // sphere

    const vector = new THREE.Vector3();

    for (let i = 0, l = objects.length; i < l; i++) {

        const phi = Math.acos(- 1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();

        object.position.setFromSphericalCoords(800, phi, theta);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        targets.sphere.push(object);

    }

    // helix

    for (let i = 0, l = objects.length; i < l; i++) {

        const theta = i * 0.175 + Math.PI;
        const y = - (i * 15) + 450;

        const object = new THREE.Object3D();

        object.position.setFromCylindricalCoords(2000, theta, y);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt(vector);

        targets.helix.push(object);

    }


    //

    renderer = new CSS3DRenderer();

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    //

    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 5
    controls.minDistance = 700;
    controls.maxDistance = 4000;
    controls.addEventListener('change', render);


    const buttonSphere = document.getElementById('sphere');
    buttonSphere.addEventListener('click', function () {

        transform(targets.sphere, 2000);

    });

    const buttonHelix = document.getElementById('helix');
    buttonHelix.addEventListener('click', function () {

        transform(targets.helix, 2000);

    });


    transform(targets.sphere, 2000);

    //

    window.addEventListener('resize', onWindowResize);

}

function transform(targets, duration) {

    TWEEN.removeAll();

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];
        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}

function onWindowResize() {

    camera.aspect = width / height
    camera.updateProjectionMatrix();

    renderer.setSize(cwidth, height);

    render();

}

function animate() {

    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render(scene, camera);

}