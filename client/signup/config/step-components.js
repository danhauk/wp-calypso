/** @format */
/**
 * Internal dependencies
 */
import AboutStepComponent from 'signup/steps/about';
import CredsConfirmComponent from 'signup/steps/creds-confirm';
import CredsCompleteComponent from 'signup/steps/creds-complete';
import CredsPermissionComponent from 'signup/steps/creds-permission';
import DesignTypeComponent from 'signup/steps/design-type';
import DesignTypeWithStoreComponent from 'signup/steps/design-type-with-store';
import DesignTypeWithAtomicStoreComponent from 'signup/steps/design-type-with-atomic-store';
import DomainsStepComponent from 'signup/steps/domains';
import GetDotBlogPlansStepComponent from 'signup/steps/get-dot-blog-plans';
import PlansStepComponent from 'signup/steps/plans';
import SiteComponent from 'signup/steps/site';
import RebrandCitiesWelcomeComponent from 'signup/steps/rebrand-cities-welcome';
import RewindAddStep from 'signup/steps/rewind-add';
import RewindCompleteStep from 'signup/steps/rewind-complete';
import RewindConfirmStep from 'signup/steps/rewind-confirm';
import RewindFormStep from 'signup/steps/rewind-form';
import SiteOrDomainComponent from 'signup/steps/site-or-domain';
import SitePicker from 'signup/steps/site-picker';
import SiteTitleComponent from 'signup/steps/site-title';
import SurveyStepComponent from 'signup/steps/survey';
import ThemeSelectionComponent from 'signup/steps/theme-selection';
import UserSignupComponent from 'signup/steps/user';
import PlansStepWithoutFreePlan from 'signup/steps/plans-without-free';
import PlansAtomicStoreComponent from 'signup/steps/plans-atomic-store';

export default {
	about: AboutStepComponent,
	'creds-confirm': CredsConfirmComponent,
	'creds-complete': CredsCompleteComponent,
	'creds-permission': CredsPermissionComponent,
	'design-type': DesignTypeComponent,
	'design-type-with-store': DesignTypeWithStoreComponent,
	'design-type-with-store-nux': DesignTypeWithAtomicStoreComponent,
	domains: DomainsStepComponent,
	'domain-only': DomainsStepComponent,
	'domains-theme-preselected': DomainsStepComponent,
	'jetpack-user': UserSignupComponent,
	'get-dot-blog-plans': GetDotBlogPlansStepComponent,
	'get-dot-blog-themes': ThemeSelectionComponent,
	plans: PlansStepComponent,
	'plans-store-nux': PlansAtomicStoreComponent,
	'plans-site-selected': PlansStepWithoutFreePlan,
	site: SiteComponent,
	'rebrand-cities-welcome': RebrandCitiesWelcomeComponent,
	'rewind-add': RewindAddStep,
	'rewind-complete': RewindCompleteStep,
	'rewind-confirm': RewindConfirmStep,
	'rewind-form': RewindFormStep,
	'site-or-domain': SiteOrDomainComponent,
	'site-picker': SitePicker,
	'site-title': SiteTitleComponent,
	survey: SurveyStepComponent,
	'survey-user': UserSignupComponent,
	test: process.env.NODE_ENV === 'development' ? require( 'signup/steps/test-step' ) : undefined,
	themes: ThemeSelectionComponent,
	'website-themes': ThemeSelectionComponent,
	'blog-themes': ThemeSelectionComponent,
	'portfolio-themes': ThemeSelectionComponent,
	'themes-site-selected': ThemeSelectionComponent,
	user: UserSignupComponent,
	'oauth2-user': UserSignupComponent,
};
