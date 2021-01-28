import { checkInput } from './js/nameChecker';
import { handleSubmit } from './js/formHandler';

// main scss stylesheet
import './styles/main.scss';

// Service Worker 
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }

export { checkInput, handleSubmit };