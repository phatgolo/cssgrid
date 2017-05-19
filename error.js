console.log(`%c
.--------------- Note ---------------.
| In order  to  view  this demo  use |
| Chrome  Canary  with  experimental |
| flags: https://goo.gl/mXWscZ       |
|------------------------------------|
| Go to: chrome://flags/             |
| Enable: Experimental JavaScript    |
| Enable: Experimental Web Platform  |
|         features                   |
'------------------------------------'
`, `
color: #FFF;
background: #e0a501;
font-size: 20px;
text-align: center;
`);

document.body.innerHTML = `
<div class="error">
    🚀<br/>
    Your browser can't run this demo,<br />
    please open dev console and follow the instructions<br />
    🚀<br/>
</div>`;