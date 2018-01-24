/** @format */

/**
 * External dependencies
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import SectionHeader from 'components/section-header';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getSiteStatsNormalizedData } from 'state/stats/lists/selectors';
import StatsModulePlaceholder from 'my-sites/stats/stats-module/placeholder';
import ErrorPanel from 'my-sites/stats/stats-error';
import QuerySiteStats from 'components/data/query-site-stats';

class AnnualSiteStats extends Component {
	static propTypes = {
		requesting: PropTypes.bool,
		years: PropTypes.array,
		translate: PropTypes.func,
		numberFormat: PropTypes.func,
		moment: PropTypes.func,
		isWidget: PropTypes.bool,
		siteId: PropTypes.number,
	};

	static defaultProps = {
		isWidget: false,
	};

	renderWidgetContent( data, strings ) {
		const { numberFormat } = this.props;
		return (
			<div className="annual-site-stats__content">
				<div className="annual-site-stats__stat is-year">
					<div className="annual-site-stats__stat-title">{ strings.year }</div>
					<div className="annual-site-stats__stat-figure is-large">{ data.year }</div>
				</div>
				<div className="annual-site-stats__stat">
					<div className="annual-site-stats__stat-title">{ strings.total_posts }</div>
					<div className="annual-site-stats__stat-figure is-large">
						{ numberFormat( data.total_posts ) }
					</div>
				</div>
				<div className="annual-site-stats__stat">
					<div className="annual-site-stats__stat-title">{ strings.total_comments }</div>
					<div className="annual-site-stats__stat-figure">
						{ numberFormat( data.total_comments ) }
					</div>
				</div>
				<div className="annual-site-stats__stat">
					<div className="annual-site-stats__stat-title">{ strings.avg_comments }</div>
					<div className="annual-site-stats__stat-figure">
						{ numberFormat( data.avg_comments ) }
					</div>
				</div>
				<div className="annual-site-stats__stat">
					<div className="annual-site-stats__stat-title">{ strings.total_likes }</div>
					<div className="annual-site-stats__stat-figure">{ numberFormat( data.total_likes ) }</div>
				</div>
				<div className="annual-site-stats__stat">
					<div className="annual-site-stats__stat-title">{ strings.avg_likes }</div>
					<div className="annual-site-stats__stat-figure">{ numberFormat( data.avg_likes ) }</div>
				</div>
				<div className="annual-site-stats__stat">
					<div className="annual-site-stats__stat-title">{ strings.total_words }</div>
					<div className="annual-site-stats__stat-figure">{ numberFormat( data.total_words ) }</div>
				</div>
				<div className="annual-site-stats__stat">
					<div className="annual-site-stats__stat-title">{ strings.avg_words }</div>
					<div className="annual-site-stats__stat-figure">{ numberFormat( data.avg_words ) }</div>
				</div>
			</div>
		);
	}

	renderTable( data, strings ) {
		const keys = Object.keys( strings );
		return (
			<div className="annual-site-stats__table-wrapper">
				<table>
					<thead>
						<tr>
							{ keys.map( key => (
								<th scope="col" key={ key }>
									{ strings[ key ] }
								</th>
							) ) }
						</tr>
					</thead>
					<tbody>
						{ data.map( ( row, i ) => (
							<tr key={ i }>
								{ keys.map( ( key, j ) => {
									const Cell = j === 0 ? 'th' : 'td';
									return (
										<Cell scope={ j === 0 ? 'row' : null } key={ j }>
											{ row[ key ] }
										</Cell>
									);
								} ) }
							</tr>
						) ) }
					</tbody>
				</table>
			</div>
		);
	}

	getStrings() {
		const { translate } = this.props;
		return {
			year: translate( 'year' ),
			total_posts: translate( 'total posts' ),
			total_comments: translate( 'total comments' ),
			avg_comments: translate( 'avg comments per post' ),
			total_likes: translate( 'total likes' ),
			avg_likes: translate( 'avg likes per post' ),
			total_words: translate( 'total words' ),
			avg_words: translate( 'avg words per post' ),
		};
	}

	render() {
		const { years, translate, moment, isWidget, siteId } = this.props;
		const strings = this.getStrings();
		const now = moment();
		const currentYear = now.format( 'YYYY' );
		let previousYear = null;
		if ( now.month() === 0 ) {
			previousYear = now.subtract( 1, 'months' ).format( 'YYYY' );
		}
		const currentYearData = years && find( years, y => y.year === currentYear );
		const previousYearData = previousYear && years && find( years, y => y.year === previousYear );
		const isLoading = ! years;
		const isError = ! isLoading && years.errors;
		const hasData = isWidget ? currentYearData || previousYearData : years;
		const noData = ! isLoading && ! isError && ! hasData;
		const noDataMsg = isWidget
			? translate( 'No annual stats recorded for this year' )
			: translate( 'No annual stats recorded' );
		/* eslint-disable wpcalypso/jsx-classname-namespace */
		return (
			<div>
				{ ! isWidget && siteId && <QuerySiteStats siteId={ siteId } statType="statsInsights" /> }
				{ isWidget && (
					<SectionHeader label={ translate( 'Annual Site Stats', { args: [ currentYear ] } ) } />
				) }
				<Card className="stats-module">
					<StatsModulePlaceholder isLoading={ isLoading } />
					{ isError && <ErrorPanel message={ translate( 'Oops! Something went wrong.' ) } /> }
					{ noData && <ErrorPanel message={ noDataMsg } /> }
					{ isWidget && currentYearData && this.renderWidgetContent( currentYearData, strings ) }
					{ isWidget && previousYearData && this.renderWidgetContent( previousYearData, strings ) }
					{ ! isWidget && years && this.renderTable( years, strings ) }
				</Card>
			</div>
		);
		/* eslint-enable wpcalypso/jsx-classname-namespace */
	}
}

export default connect( state => {
	const statType = 'statsInsights';
	const siteId = getSelectedSiteId( state );
	const insights = getSiteStatsNormalizedData( state, siteId, statType, {} );

	return {
		years: insights.years,
		siteId,
	};
} )( localize( AnnualSiteStats ) );
