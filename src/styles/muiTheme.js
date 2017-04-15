import _ from 'lodash';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default _.assign({}, lightBaseTheme, {
  palette: _.assign({}, lightBaseTheme.palette, {
    // override palate
  })
});
