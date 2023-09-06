import HomePage from '../pageobjects/home.page.js'
import { verifyPageTitle } from '../utilities/helper.js';
import resources from '../resources/index.js';

let clipName;

describe('Verify that first clip is correctly opened', () => {

    it('Should be opened and navigated to first clip', async () => {
        await HomePage.openAcceptAge();
        clipName = await HomePage.clipByTypeAndNumber(resources.clipsType.topClips, 0).getText();
        await HomePage.clipByTypeAndNumber(resources.clipsType.topClips, 0).click();
        await verifyPageTitle(clipName);
    })
})

