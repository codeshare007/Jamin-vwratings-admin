import Vue from 'vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faList,
  faArrowsAltH,
  faAngleRight,
  faChartArea,
  faMailBulk,
  faUsers,
  faStar,
  faUserTag,
  faGlassCheers,
  faComments,
  faHandPaper,
  faWrench,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core"

library.add(faUsers)
library.add(faList)
library.add(faChartArea)
library.add(faArrowsAltH)
library.add(faMailBulk)
library.add(faWrench)
library.add(faStar)
library.add(faGlassCheers)
library.add(faUserTag)
library.add(faComments)
library.add(faHandPaper)
library.add(faAngleRight)
library.add(faCommentDots)

dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon)