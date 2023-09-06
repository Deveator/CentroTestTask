export default class Page {

    get iCertifyCheckbox () {
        return $('//*[@id="iCertifyCheck"]/following-sibling::div');
    }

    get enterAgree () {
        return $('#enter-agree');
    }

    open () {
        return browser.url(`/`)
    }

    async openAcceptAge () {
        browser.url(`/`);
        await this.iCertifyCheckbox.click();
        await this.enterAgree.click();
    }
}
