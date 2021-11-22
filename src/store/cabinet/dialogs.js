import UserEditDialog from './dialogs/user';
import AviEditDialog from './dialogs/avi';
import AviClaimEditDialog from './dialogs/aviClaim';
import AviCommentEditDialog from './dialogs/aviComment';
import AdsCampaignEditDialog from './dialogs/campaign';
import PartyEditDialog from './dialogs/party';
import PartyCommentEditDialog from './dialogs/partyComment';
import PartyClaimEditDialog from './dialogs/partyClaim'

export default {
  namespaced: true,
  modules: {
    user: UserEditDialog,
    campaign: AdsCampaignEditDialog,
    avi: AviEditDialog,
    aviClaim: AviClaimEditDialog,
    aviComment: AviCommentEditDialog,
    party: PartyEditDialog,
    partyClaim: PartyClaimEditDialog,
    partyComment: PartyCommentEditDialog,
  },
}
