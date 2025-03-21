// import sanitizeComment from '../../utils/sanitizeComment.js';

export default function init(el) {
  console.log(el);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("custom-form");
  const submitButton = document.getElementById("submit-button");
  const statusMessage = document.createElement("p");
  statusMessage.id = "status-message";
  form.appendChild(statusMessage);

  form.addEventListener("submit", async function (event) {
      event.preventDefault();
      submitButton.disabled = true;
      statusMessage.textContent = "Submitting...";
      statusMessage.style.color = "blue";
      
      if (!form.checkValidity()) {
          statusMessage.textContent = "Please fill in all required fields correctly.";
          statusMessage.style.color = "red";
          submitButton.disabled = false;
          return;
      }

      const payload = constructPayload(form);
      payload.timestamp = new Date().toISOString();

      try {
          const response = await fetch("https://submission-worker.main--lehre-site--berufsbildung-basel.workers.dev", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
          }

          console.log("Form submitted successfully", await response.json());
          statusMessage.textContent = "Form submitted successfully!";
          statusMessage.style.color = "green";
          form.reset();
      } catch (error) {
          console.error("Form submission failed:", error);
          statusMessage.textContent = "Submission failed. Please try again.";
          statusMessage.style.color = "red";
      }
      submitButton.disabled = false;
  });

  function constructPayload(form) {
      const payload = {};
      new FormData(form).forEach((value, key) => {
          payload[key] = value;
      });
      return payload;
  }
});


// const RULE_OPERATORS = {
//   equal: '=',
//   notEquaxl: '!=',
//   lessThan: '<',
//   lessThanOrEqual: '<=',
//   greaterThan: '>',
//   greaterThanOrEqual: '>=',
//   includes: 'inc',
//   excludes: 'exc',
// };

// function createSelect({ field, placeholder, options, defval, required }) {
//   const select = createTag('select', { id: field });
//   if (placeholder) select.append(createTag('option', { selected: '', disabled: '' }, placeholder));
//   options.split(',').forEach((o) => {
//     const text = o.trim();
//     const option = createTag('option', { value: text }, text);
//     select.append(option);
//     if (defval === text) select.value = text;
//   });
//   if (required === 'x') select.setAttribute('required', 'required');
//   return select;
// }

// function constructPayload(form) {
//   const payload = {};
//   [...form.elements].filter((el) => el.tagName !== 'BUTTON').forEach((fe) => {
//     if (fe.type.match(/(?:checkbox|radio)/)) {
//       if (fe.checked) {
//         payload[fe.name] = payload[fe.name] ? `${fe.value}, ${payload[fe.name]}` : fe.value;
//       } else {
//         payload[fe.name] = payload[fe.name] || '';
//       }
//       return;
//     }
//     payload[fe.id] = fe.value;
//   });
//   return payload;
// }

// async function submitForm(form) {
//   const payload = constructPayload(form); 
//   payload.timestamp = new Date().toISOString(); 

//   try {
//     const response = await fetch('https://submission-worker.main--lehre-site--berufsbildung-basel.workers.dev', { 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload), 
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     // Log success message to the console
//     console.log('POST request successful:', {
//       status: response.status,
//       statusText: response.statusText,
//       payload,
//     });

//     const result = await response.json();
//     console.log('Response from server:', result); // Log the server response
//     return result; 
//   } catch (error) {
//     console.error('Form submission failed:', error);
//     return { status: 'error', message: error.message };
//   }
// }


// // function loadTurnstile() {
// //   const script = document.createElement('script');
// //   script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// //   script.async = true;
// //   script.onload = () => {
// //     turnstile.render('#captcha-container', {
// //       sitekey: '0x4AAAAAAA6uqp_nGspHkBq3',
// //       callback: (token) => {
// //         console.log('CAPTCHA Token received:', token);
// //         document.querySelector('#cf-turnstile-response').value = token;
// //       }
// //     });
// //   };
// //   document.body.appendChild(script);
// // }

// // document.addEventListener('DOMContentLoaded', loadTurnstile);


// function clearForm(form) {
//   [...form.elements].forEach((fe) => {
//     if (fe.type.match(/(?:checkbox|radio)/)) {
//       fe.checked = false;
//     } else {
//       fe.value = '';
//     }
//   });
// }

// function createButton({ type, label }, thankYou) {
//   const button = createTag('button', { class: 'button' }, label);
//   if (type === 'submit') {
//     button.addEventListener('click', async (event) => {
//       const form = button.closest('form');
//       if (form.checkValidity()) {
//         event.preventDefault();
//         button.setAttribute('disabled', '');
//         const submission = await submitForm(form);
//         button.removeAttribute('disabled');
//         if (!submission) return;
//         clearForm(form);
//         const handleThankYou = thankYou.querySelector('a') ? thankYou.querySelector('a').href : thankYou.innerHTML;
//         if (!thankYou.innerHTML.includes('href')) {
//           const thanksText = createTag('h4', { class: 'thank-you' }, handleThankYou);
//           form.append(thanksText);
//           setTimeout(() => thanksText.remove(), 2000);
//           /* c8 ignore next 3 */
//         } else {
//           window.location.href = handleThankYou;
//         }
//       }
//     });
//   }
//   if (type === 'clear') {
//     button.classList.add('outline');
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       const form = button.closest('form');
//       clearForm(form);
//     });
//   }
//   return button;
// }

// function createHeading({ label }, el) {
//   return createTag(el, {}, label);
// }

// function createInput({ type, field, placeholder, required, defval }) {
//   const input = createTag('input', { type, id: field, placeholder, value: defval });
//   if (required === 'x') input.setAttribute('required', 'required');
//   return input;
// }

// function createTextArea({ field, placeholder, required, defval }) {
//   const input = createTag('textarea', { id: field, placeholder, value: defval });
//   if (required === 'x') input.setAttribute('required', 'required');
//   return input;
// }

// function createlabel({ field, label, required }) {
//   return createTag('label', { for: field, class: required ? 'required' : '' }, label);
// }

// function createCheckItem(item, type, id, def) {
//   const itemKebab = item.toLowerCase().replaceAll(' ', '-');
//   const defList = def.split(',').map((defItem) => defItem.trim());
//   const pseudoEl = createTag('span', { class: `check-item-button ${type}-button` });
//   const label = createTag('label', { class: `check-item-label ${type}-label`, for: `${id}-${itemKebab}` }, item);
//   const input = createTag(
//     'input',
//     { type, name: id, value: item, class: `check-item-input ${type}-input`, id: `${id}-${itemKebab}` },
//   );
//   if (item && defList.includes(item)) input.setAttribute('checked', '');
//   return createTag('div', { class: `check-item-wrap ${type}-input-wrap` }, [input, pseudoEl, label]);
// }

// function createCheckGroup({ options, field, defval, required }, type) {
//   const optionsMap = options.split(',').map((item) => createCheckItem(item.trim(), type, field, defval));
//   return createTag(
//     'div',
//     { class: `group-container ${type}-group-container${required === 'x' ? ' required' : ''}` },
//     optionsMap,
//   );
// }

// function processNumRule(tf, operator, a, b) {
//   /* c8 ignore next 3 */
//   if (!tf.dataset.type.match(/(?:number|date)/)) {
//     throw new Error(`Comparison field must be of type number or date for ${operator} rules`);
//   }
//   const { type } = tf.dataset;
//   const a2 = type === 'number' ? parseInt(a, 10) : Date.parse(a);
//   const b2 = type === 'number' ? parseInt(b, 10) : Date.parse(b);
//   return [a2, b2];
// }

// function processRule(tf, operator, payloadKey, value, comparisonFunction) {
//   if (payloadKey === '') return true;
//   try {
//     const [a, b] = processNumRule(tf, operator, payloadKey, value);
//     return comparisonFunction(a, b);
//     /* c8 ignore next 5 */
//   } catch (e) {
//     // eslint-disable-next-line no-console
//     console.warn(`Invalid rule, ${e}`);
//     return false;
//   }
// }

// function applyRules(form, rules) {
//   const payload = constructPayload(form);
//   rules.forEach((field) => {
//     const { type, condition: { key, operator, value } } = field.rule;
//     const fw = form.querySelector(`[data-field-id=${field.fieldId}]`);
//     const tf = form.querySelector(`[data-field-id=${key}]`);
//     let force = false;
//     switch (operator) {
//       case RULE_OPERATORS.equal:
//         force = (payload[key] === value);
//         break;
//       case RULE_OPERATORS.notEqual:
//         force = (payload[key] !== value);
//         break;
//       case RULE_OPERATORS.includes:
//         force = (payload[key].split(',').map((s) => s.trim()).includes(value));
//         break;
//       case RULE_OPERATORS.excludes:
//         force = (!payload[key].split(',').map((s) => s.trim()).includes(value));
//         break;
//       case RULE_OPERATORS.lessThan:
//         force = processRule(tf, operator, payload[key], value, (a, b) => a < b);
//         break;
//       case RULE_OPERATORS.lessThanOrEqual:
//         force = processRule(tf, operator, payload[key], value, (a, b) => a <= b);
//         break;
//       case RULE_OPERATORS.greaterThan:
//         force = processRule(tf, operator, payload[key], value, (a, b) => a > b);
//         break;
//       case RULE_OPERATORS.greaterThanOrEqual:
//         force = processRule(tf, operator, payload[key], value, (a, b) => a >= b);
//         break;
//       default:
//         // eslint-disable-next-line no-console
//         console.warn(`Unsupported operator ${operator}`);
//         return false;
//     }
//     fw.classList.toggle(type, force);
//     return false;
//   });
// }

// function lowercaseKeys(obj) {
//   return Object.keys(obj).reduce((acc, key) => {
//     acc[key.toLowerCase() === 'default' ? 'defval' : key.toLowerCase()] = obj[key];
//     return acc;
//   }, {});
// }

// async function createForm(formURL, thankYou, formData) {
//   const { pathname } = new URL(formURL);
//   let json = formData;
//   /* c8 ignore next 4 */
//   if (!formData) {
//     const resp = await fetch(pathname);
//     json = await resp.json();
//   }
//   json.data = json.data.map((obj) => lowercaseKeys(obj));
//   const form = createTag('form');
//   const rules = [];
//   const [action] = pathname.split('.json');
//   form.dataset.action = action;

//   const typeToElement = {
//     select: { fn: createSelect, params: [], label: true, classes: [] },
//     heading: { fn: createHeading, params: ['h3'], label: false, classes: [] },
//     legal: { fn: createHeading, params: ['p'], label: false, classes: [] },
//     checkbox: { fn: createCheckGroup, params: ['checkbox'], label: true, classes: ['field-group-wrapper'] },
//     'checkbox-group': { fn: createCheckGroup, params: ['checkbox'], label: true, classes: ['field-group-wrapper'] },
//     'radio-group': { fn: createCheckGroup, params: ['radio'], label: true, classes: ['field-group-wrapper'] },
//     'text-area': { fn: createTextArea, params: [], label: true, classes: [] },
//     submit: { fn: createButton, params: [thankYou], label: false, classes: ['field-button-wrapper'] },
//     clear: { fn: createButton, params: [thankYou], label: false, classes: ['field-button-wrapper'] },
//     default: { fn: createInput, params: [], label: true, classes: [] },
//   };

//   json.data.forEach((fd) => {
//     fd.type = fd.type || 'text';
//     const style = fd.extra ? ` form-${fd.extra}` : '';
//     const fieldWrapper = createTag(
//       'div',
//       { class: `field-wrapper form-${fd.type}-wrapper${style}`, 'data-field-id': fd.field, 'data-type': fd.type },
//     );

//     const elParams = typeToElement[fd.type] || typeToElement.default;
//     if (elParams.label) fieldWrapper.append(createlabel(fd));
//     fieldWrapper.append(elParams.fn(fd, ...elParams.params));
//     fieldWrapper.classList.add(...elParams.classes);

//     if (fd.rules?.length) {
//       try {
//         rules.push({ fieldId: fd.field, rule: JSON.parse(fd.rules) });
//         /* c8 ignore next 4 */
//       } catch (e) {
//         // eslint-disable-next-line no-console
//         console.warn(`Invalid Rule ${fd.rules}: ${e}`);
//       }
//     }
//     form.append(fieldWrapper);
//   });

//   form.addEventListener('input', () => applyRules(form, rules));
//   applyRules(form, rules);
//   return form;
// }

// export default async function decorate(block, formData = null) {
//   const form = block.querySelector('a[href$=".json"]');
//   const thankYou = block.querySelector(':scope > div:last-of-type > div');
//   thankYou.remove();
//   if (form) form.replaceWith(await createForm(form.href, thankYou, formData));
// }
