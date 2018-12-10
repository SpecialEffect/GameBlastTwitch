# SpecialEffect Twitch Plugin

## Building
___
Restore packages with 
```npm install```

Two scripts are defined in ```package.json```: 

``` npm run dev``` 

and 

``` npm run build```

Run ```dev``` to have webpack watch for changes in the source and rebuild automatically. 


Run ```build``` to create production, minified, assets. 

## Usage
___
Include the following css and java script files
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SpecialEffect/GameBlastTwitch/dist/app.min.css"/>
```

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/SpecialEffect/GameBlastTwitch/dist/main.js"></script>
```

We're using jsdelivr to serve the css & js from the git hub repostory.
For production, a branch should be created, and a version used. 
This can then be specified in the URL using @<branch name>.
eg:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/SpecialEffect/GameBlastTwitch@1.0/dist/main.js"></script>
```

## Rendering
___
After referencing the files, add a div to the page with the id "carousel". The javascript will render the twitch component inside of this div.

```html 
<div id="carousel"></div>
```

## Configuring twitch users
___
Add a div with the css class ```twitch-usernames```. 
The Text content of this div should be a comma delimited list of twitch usernames. eg:
```html
<div class="twitch-usernames">xgladd,kinggothalion,professorbroman,dakotaz,symfuhny,Datto,a541021,teftyteft,ifrostbolt</div>
```

The twitch user name can be found by going to [Twitch](https://www.twitch.tv/), browsing for a user and then copying their name out of the URL. eg: 

```https://www.twitch.tv/xgladd```

Here the username is ___xgladd___.
