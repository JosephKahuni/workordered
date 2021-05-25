import { AccountsService } from '@accounts/services/accounts/accounts.service';

export function appInitializer(accountsService: AccountsService): any {
    return () => new Promise(
        resolve => {
            accountsService.refreshUser()
                // tslint:disable-next-line: deprecation
                .subscribe()
                .add(resolve);
        }
    );
}
