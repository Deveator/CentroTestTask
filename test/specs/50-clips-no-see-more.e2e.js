import HomePage from '../pageobjects/home.page.js'
import { containsDuplicates, getAttributes, getText } from '../utilities/helper.js';
import resources from '../resources/index.js';

describe('Open 50 previews and verify order, no dublicates', () => {

    it('Should be opened 50 previews of section and no option to see more', async () => {
        await HomePage.openAcceptAge();
        await HomePage.clickSeeMoreUntilPreviewNumber(50, resources.clipsSection.topClips);
        await expect(await HomePage.seeMoreBySection(resources.clipsSection.topClips).isClickable()).toBe(false);
    })

    it('Opened previews should be ordered by ASC and no dublicates', async () => {
        // verify no clipIds dublicates
        await containsDuplicates(await getAttributes(await HomePage.clipsBySection(resources.clipsSection.topClips), resources.attributes.clipId));
        // verify no naming dublicates
        await containsDuplicates(await getText(await HomePage.clipsTitleBySection(resources.clipsSection.topClips)));
        await HomePage.verifyClipsSortedInRange(resources.clipsSection.topClips, 1, 50, 1)
    })
})

