import Page from './page.js';
import { arrayWithNumberInRange, getText, convertArrayInNumbers } from '../utilities/helper.js';

class HomePage extends Page {

    clipByTypeAndNumber(type, number) {
        return $(`//*[@data-testid='${type}_${number}-clipCard-titleAnchor' and not(contains(@target,'_self'))]`)
    }

    seeMoreBySection(section) {
        return $(`//div[@id='${section}']//*[contains(@data-testid,"seeMoreButton")]`)
    }

    clipsTitleBySection(section) {
        return $$(`//*[@id='${section}']//*[contains(@data-testid,'title')]`)
    }

    clipsBySection(section) {
        return $$(`//*[@id='${section}']//*[contains(@data-testid,"anchor") and not(contains(@target,"_self"))]`)
    }

    clipsNumberBySection(section) {
        return $$(`//*[@id='${section}']//*[contains(@class,'items-center')]/div[1]`)
    }

    async clickSeeMoreUntilPreviewNumber(expectedClipsNumber, clipsSection) {
        let actualClipsNumber = await this.getNumOfClips(clipsSection);
        if (actualClipsNumber >= expectedClipsNumber) {
            throw new Error(`Wrong number of default displayed clips previews`);
        }
        do {
            await this.seeMoreBySection(clipsSection).click();
            actualClipsNumber = actualClipsNumber + 10;
            await this.verifyNumOfDisplayedClips(clipsSection, actualClipsNumber);

        } while (actualClipsNumber !== expectedClipsNumber || actualClipsNumber < expectedClipsNumber);
        await expect(actualClipsNumber === expectedClipsNumber).toBe(true);
    }

    async getNumOfClips(section) {
        return await this.clipsTitleBySection(section).length;
    }

    async verifyNumOfDisplayedClips(clipsSection, expectedClipsNumber) {
        await browser.waitUntil(async () => {
            if (await this.clipsTitleBySection(clipsSection).length === expectedClipsNumber) {
                return true
            } else {
                return false;
            }
        }, {
            timeout: 15000,
            timeoutMsg: 'Number of displayed clips is not as expected'
        })
    }

    async verifyClipsSortedInRange(section, start, stop, step) {
        let actualOrderNumber = await convertArrayInNumbers(await getText(await this.clipsNumberBySection(section)))
        let expectedArray = arrayWithNumberInRange(start, stop, step);
        expect(JSON.stringify(actualOrderNumber) === JSON.stringify(expectedArray)).toBe(true);
    }
}

export default new HomePage();
