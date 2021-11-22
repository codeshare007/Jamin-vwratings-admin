import UserEditDialog from './dialogs/user';
import AviEditDialog from './dialogs/avi'
import AviClaimEditDialog from './dialogs/aviClaim'
import AviCommentEditDialog from './dialogs/aviComment'
import AdsCampaignEditDialog from './dialogs/campaign'

export default {
  namespaced: true,
  modules: {
    user: UserEditDialog,
    avi: AviEditDialog,
    aviComment: AviCommentEditDialog,
    aviClaim: AviClaimEditDialog,
    campaign: AdsCampaignEditDialog
  },
}
