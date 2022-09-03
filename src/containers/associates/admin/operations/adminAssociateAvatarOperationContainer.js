import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminAssociateAvatarOperationComponent from "../../../../components/associates/admin/operations/adminAssociateAvatarOperationComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { postAssociateAvatarCreateOrUpdate } from "../../../../actions/associateOperationActions";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { validateImageInput } from "../../../../validators/fileValidator"


class AdminAssociateAvatarOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            isLoading: false,
            title: "",
            description: "",
            fileReader: new FileReader(), // DJANGO-REACT UPLOAD: STEP 1 OF 4.
            tags: [],
            isTagSetsLoading: true,
            is_archived: false,

            // Everything else...
            associateId: id,
            file: null,
            id: id,
            text: "",
            errors: {},
        }
        this.getPostData = this.getPostData.bind(this);
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
        this.onSuccessPostCallback = this.onSuccessPostCallback.bind(this);
        this.onFailurePostCallback = this.onFailurePostCallback.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onFileDrop = this.onFileDrop.bind(this);
        this.onRemoveFileUploadClick = this.onRemoveFileUploadClick.bind(this);
        this.handleFile = this.handleFile.bind(this); // DJANGO-REACT UPLOAD: STEP 2 OF 4.
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // Set the parse integer.
        postData.associateId = parseInt(this.state.associateId);

        // Tags - We need to only return our `id` values.
        let idTags = [];
        for (let i = 0; i < this.state.tags.length; i++) {
            let tag = this.state.tags[i];
            idTags.push(tag.value);
        }
        postData.tags = idTags;

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessListCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessListCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessListCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureListCallback(errors) {
        console.log(errors);
        this.setState({ isLoading: false });
    }

    onSuccessPostCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                page: response.page,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessPostCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessPostCallback | State (Post-Fetch):", this.state);
                this.props.setFlashMessage("success", "Associate avatar has been successfully updated.");
                this.props.history.push("/associate/"+this.state.id);
            }
        )
    }

    onFailurePostCallback(errors) {
        console.log("onFailurePostCallback |", errors);
        this.setState({ isLoading: false, errors: errors, });
    }

    onTagFetchSuccessCallback(response) {
        this.setState({ isTagSetsLoading: false, });
    }


    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    handleFile(e) { // DJANGO-REACT UPLOAD: STEP 3 OF 4.
        const content = this.state.fileReader.result;
        this.setState({
            errors: {},
            isLoading: true,
            upload_content: content,
            upload_filename: this.state.file.name,
            // upload_filename: this.state.fileReader
        }, ()=>{
            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();

            // Once our state has been validated `associate-side` then we will
            // make an API request with the server to create our new production.
            this.props.postAssociateAvatarCreateOrUpdate(
                this.getPostData(),
                this.onSuccessPostCallback,
                this.onFailurePostCallback
            );
        });
    }

    onClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateImageInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            // DJANGO-REACT UPLOAD: STEP 4 OF 4.
            // DEVELOPERS NOTE:
            // (1) http://jsbin.com/piqiqecuxo/1/edit?js,console,output
            // (2) https://stackoverflow.com/questions/51272255/how-to-use-filereader-in-react
            var fileReader = new FileReader();
            fileReader.readAsDataURL(this.state.file);
            fileReader.onload = this.handleFile;
            fileReader.onerror = function (error) {
                console.log('Error: ', error);
            };
            this.setState({
                fileReader: fileReader,
            });

        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Special Thanks: https://react-dropzone.netlify.com/#previews
     */
    onFileDrop(acceptedFiles) {
        console.log("DEBUG | onFileDrop | acceptedFiles", acceptedFiles);
        const file = acceptedFiles[0];

        // For debuging purposes only.
        console.log("DEBUG | onFileDrop | file", file);

        if (file !== undefined && file !== null) {
            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });

            // For debugging purposes.
            console.log("DEBUG | onFileDrop | fileWithPreview", fileWithPreview);

            // Update our local state to update the GUI.
            this.setState({
                file: fileWithPreview
            })
        }
    }

    onRemoveFileUploadClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Clear uploaded file.
        this.setState({
            file: null
        })
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const associate = this.props.associateDetail ? this.props.associateDetail : {};
        const associateFiles = this.props.associateFileList ? this.props.associateFileList.results : [];
        return (
            <AdminAssociateAvatarOperationComponent
                {...this}
                {...this.state}
                {...this.props}
                associate={associate}
                associateFiles={associateFiles}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        tagList: store.tagListState,
        flashMessage: store.flashMessageState,
        associateFileList: store.associateFileListState,
        associateDetail: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        postAssociateAvatarCreateOrUpdate: (postData, successCallback, failedCallback) => {
            dispatch(postAssociateAvatarCreateOrUpdate(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateAvatarOperationContainer);
