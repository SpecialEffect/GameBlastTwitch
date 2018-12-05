export const createElement = (tagName, classes, attributes, children, innerText) => {
    const element = document.createElement(tagName);

    if(innerText !== undefined && innerText !== null) {
        element.innerText = innerText;
    }

    if(classes !== undefined && classes !== null && typeof classes[Symbol.iterator] === "function") {
        for(let val of classes) {
            element.classList.add(val);
        }
    }
    
    if(children !== undefined && children !== null && typeof children[Symbol.iterator] === "function"){
        for(let child of children) {
            element.appendChild(child);
        }
    }

    if(attributes !== undefined && attributes !== null && typeof attributes[Symbol.iterator] === "function"){
        for(let attribute of attributes) {
            element.setAttribute(attribute.name, attribute.value)
        }
    }

    return element;
}   