import { connect } from 'react-redux'
import { PopoverFilter } from "./PopoverFilter";
import { PopoverColor } from "./PopoverColor";
import { PopoverBrand } from "./PopoverBrand";
// import { PopoverDate } from "./PopoverDate";
// import { PopoverAttach } from "./PopoverAttach";
// import { PopoverChecklist } from "./PopoverChecklist";
// import { PopoverMoveCopy } from './PopoverMoveCopy';
// import { PopoverProfile } from './PopoverProfile';
// import { PopoverInvite } from "./PopoverInvite";
// import { PopoverMenu } from './PopoverMenu';
// import { PopoverBackground } from './PopoverBackground';
// import { PopoverArchive } from './PopoverArchive';
// import { PopoverActivity } from './PopoverActivity';
// import { PopoverBoardFilter } from './PopoverBoardFilter';
// import { PopoverCreateBoard } from './PopoverCreateBoard';
// import { PopoverListMenu } from './PopoverListMenu';
// import { PopoverNotifics } from './PopoverNotifics';
// import { PopoverBoardsSearch } from './PopoverBoardsSearch';
// import { PopoverCamera } from './PopoverCamera';

function _DynamicPopover({ currPopover }) {
    
    const { name, props } = currPopover

    switch (name) {
        case 'Filter': return <PopoverFilter {...props} />;
        case 'COLOR': return <PopoverColor {...props} />;
        case 'BRAND': return <PopoverBrand {...props} />;
        // case 'DATE': return <PopoverDate {...props} />;
        // case 'COPY': return <PopoverMoveCopy popoverType="copy" {...props} />;
        // case 'MOVE': return <PopoverMoveCopy popoverType="move" {...props} />;
        // case 'ATTACH': return <PopoverAttach {...props} />;
        // case 'CHECKLIST': return <PopoverChecklist {...props} />;
        // case 'PROFILE': return <PopoverProfile {...props} />
        // case 'INVITE': return <PopoverInvite {...props} />
        // case 'MENU': return <PopoverMenu {...props} />
        // case 'BACKGROUND': return <PopoverBackground {...props} />
        // case 'ARCHIVE': return <PopoverArchive {...props} />
        // case 'ACTIVITY': return <PopoverActivity {...props} />
        // case 'BOARD_FILTER': return <PopoverBoardFilter {...props} />
        // case 'CREATE_BOARD': return <PopoverCreateBoard {...props} />
        // case 'LIST_MENU': return <PopoverListMenu {...props} />
        // case 'NOTIFICATIONS': return <PopoverNotifics {...props} />
        // case 'BOARDS_SEARCH': return <PopoverBoardsSearch {...props} />
        // case 'CAMERA': return <PopoverCamera {...props} />
        default: return '';
    }
}

function mapStateToProps(state) {
    return {
        isOverlayOpen: state.appModule.isOverlayOpen,
        currPopover: state.appModule.currPopover
    }
}

export const DynamicPopover = connect(mapStateToProps, null)(_DynamicPopover)