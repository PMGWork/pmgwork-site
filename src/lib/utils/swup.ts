import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import BodyClassPlugin from '@swup/body-class-plugin';

const swup = new Swup({
    containers: ['#swup'],
    plugins: [
        new BodyClassPlugin(),
        new SwupHeadPlugin(),
    ],
    linkSelector: 'a[href^="/"]:not([data-no-swup]):not([href^="#"]):not([target]):not([download])',
    cache: false
});

swup.hooks.on('page:view', () => {
    window.dispatchEvent(new CustomEvent('swup:page:view'));
});

export default swup;