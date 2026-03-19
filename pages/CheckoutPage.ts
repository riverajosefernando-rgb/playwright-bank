import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly continueButton: Locator;
    readonly paymentMethodSelect: Locator;
    readonly cardNumberInput: Locator;
    readonly expiryInput: Locator;
    readonly cvvInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.locator('button:has-text("Continue")');
        this.paymentMethodSelect = page.locator('select[name="paymentMethod"]');
        this.cardNumberInput = page.locator('input[name="cardNumber"]');
        this.expiryInput = page.locator('input[name="expiry"]');
        this.cvvInput = page.locator('input[name="cvv"]');
        this.submitButton = page.locator('button:has-text("Submit")');
        this.successMessage = page.locator('.success-message');
        this.errorMessage = page.locator('.error-message');
    }

    async goto() {
        await this.page.goto('/checkout');
    }

    async selectPaymentMethod(method: string) {
        await this.paymentMethodSelect.selectOption(method);
    }

    async fillCardDetails(cardNumber: string, expiry: string, cvv: string) {
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryInput.fill(expiry);
        await this.cvvInput.fill(cvv);
    }

    async submitCheckout() {
        await this.submitButton.click();
    }

    async isSuccessMessageVisible() {
        return await this.successMessage.isVisible();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}