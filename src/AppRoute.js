import { React, useState } from "react";
import 'bulma/css/bulma.min.css';
import './index.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

import LogoutRedirector from "./Components/Gateway/LogoutRedirector";
import Login from "./Components/Gateway/Login";
import Index from "./Components/Gateway/Index";
import TopAlertBanner from "./Components/Misc/TopAlertBanner";
import Sidebar from "./Components/Menu/Sidebar";
import Topbar from "./Components/Menu/Top";
import NotFoundError from "./Components/Misc/NotFoundError";
import NotImplementedError from "./Components/Misc/NotImplementedError";
import ForgotPassword from "./Components/Gateway/ForgotPassword";
import PasswordReset from "./Components/Gateway/PasswordReset";
import RootDashboard from "./Components/Root/Dashboard";
import RootTenantList from "./Components/Root/Tenant/List";
import RootTenantDetail from "./Components/Root/Tenant/Detail";
import RootTenantUpdate from "./Components/Root/Tenant/Update";
import ToTenantRedirector from "./Components/Root/ToTenantRedirector";
import AdminDashboard from "./Components/Admin/Dashboard";
import AdminClientList from "./Components/Admin/Client/List";
import AdminClientSearchResult from "./Components/Admin/Client/Search/Result";
import AdminClientSearch from "./Components/Admin/Client/Search/Search";
import AdminClientAddStep1 from "./Components/Admin/Client/Add/Step1";
import AdminClientAddStep2 from "./Components/Admin/Client/Add/Step2";
import AdminClientAddStep3 from "./Components/Admin/Client/Add/Step3";
import AdminClientAddStep4 from "./Components/Admin/Client/Add/Step4";
import AdminClientAddStep5 from "./Components/Admin/Client/Add/Step5";
import AdminClientAddStep6 from "./Components/Admin/Client/Add/Step6";
import AdminClientAddStep7 from "./Components/Admin/Client/Add/Step7";
import AdminClientDetailLite from "./Components/Admin/Client/DetailLite";
import AdminClientDetailFull from "./Components/Admin/Client/DetailFull";
import AdminClientUpdate from "./Components/Admin/Client/Update";
import AdminClientDetailOrderList from "./Components/Admin/Client/Order/List";
import AdminClientDetailCommentList from "./Components/Admin/Client/DetailCommentList";
import AdminClientDetailAttachmentList from "./Components/Admin/Client/Attachment/List";
import AdminClientDetailMore from "./Components/Admin/Client/DetailMore";
import AdminClientDeleteOperation from "./Components/Admin/Client/Operation/Delete";
import AdminClientArchiveOperation from "./Components/Admin/Client/Operation/Archive";
import AdminClientUnarchiveOperation from "./Components/Admin/Client/Operation/Unarchive";
import AdminClientUpgradeOperation from "./Components/Admin/Client/Operation/Upgrade";
import AdminClientDowngradeOperation from "./Components/Admin/Client/Operation/Downgrade";
import AdminClientAttachmentAdd from "./Components/Admin/Client/Attachment/Add";
import AdminClientAttachmentDetail from "./Components/Admin/Client/Attachment/Detail";

function AppRoute() {
    return (
        <div class="is-widescreen">
            <RecoilRoot>
                <Router>
                    <TopAlertBanner />
                    <Topbar />
                    <div class="columns">
                        <Sidebar />
                        <div class="column">
                            <section class="main-content columns is-fullheight">
                                <Routes>
                                    <Route exact path="/admin/client/:cid/downgrade" element={<AdminClientDowngradeOperation/>}/>
                                    <Route exact path="/admin/client/:cid/upgrade" element={<AdminClientUpgradeOperation/>}/>
                                    <Route exact path="/admin/client/:cid/unarchive" element={<AdminClientUnarchiveOperation/>}/>
                                    <Route exact path="/admin/client/:cid/archive" element={<AdminClientArchiveOperation/>}/>
                                    <Route exact path="/admin/client/:cid/permadelete" element={<AdminClientDeleteOperation/>}/>
                                    <Route exact path="/admin/client/:cid/more" element={<AdminClientDetailMore/>}/>
                                    <Route exact path="/admin/client/:cid/attachment/:aid" element={<AdminClientAttachmentDetail/>}/>
                                    <Route exact path="/admin/client/:cid/attachments/add" element={<AdminClientAttachmentAdd/>}/>
                                    <Route exact path="/admin/client/:cid/attachments" element={<AdminClientDetailAttachmentList/>}/>
                                    <Route exact path="/admin/client/:cid/comments" element={<AdminClientDetailCommentList/>}/>
                                    <Route exact path="/admin/client/:cid/orders" element={<AdminClientDetailOrderList/>}/>
                                    <Route exact path="/admin/client/:cid/edit" element={<AdminClientUpdate/>}/>
                                    <Route exact path="/admin/client/:cid/detail" element={<AdminClientDetailFull/>}/>
                                    <Route exact path="/admin/client/:cid" element={<AdminClientDetailLite/>}/>
                                    <Route exact path="/admin/clients/add/step-7" element={<AdminClientAddStep7/>}/>
                                    <Route exact path="/admin/clients/add/step-6" element={<AdminClientAddStep6/>}/>
                                    <Route exact path="/admin/clients/add/step-5" element={<AdminClientAddStep5/>}/>
                                    <Route exact path="/admin/clients/add/step-4" element={<AdminClientAddStep4/>}/>
                                    <Route exact path="/admin/clients/add/step-3" element={<AdminClientAddStep3/>}/>
                                    <Route exact path="/admin/clients/add/step-2" element={<AdminClientAddStep2/>}/>
                                    <Route exact path="/admin/clients/add/step-1" element={<AdminClientAddStep1/>}/>
                                    <Route exact path="/admin/clients/search-result" element={<AdminClientSearchResult/>}/>
                                    <Route exact path="/admin/clients/search" element={<AdminClientSearch/>}/>
                                    <Route exact path="/admin/clients" element={<AdminClientList/>}/>
                                    <Route exact path="/admin/dashboard" element={<AdminDashboard/>}/>
                                    <Route exact path="/root/tenant/:tid/start" element={<ToTenantRedirector/>}/>
                                    <Route exact path="/root/tenant/:tid/edit" element={<RootTenantUpdate/>}/>
                                    <Route exact path="/root/tenant/:tid" element={<RootTenantDetail/>}/>
                                    <Route exact path="/root/tenants" element={<RootTenantList/>}/>
                                    <Route exact path="/root/dashboard" element={<RootDashboard/>}/>
                                    <Route exact path="/login" element={<Login/>}/>
                                    <Route exact path="/logout" element={<LogoutRedirector/>}/>
                                    <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
                                    <Route exact path="/password-reset" element={<PasswordReset/>}/>
                                    <Route exact path="/501" element={<NotImplementedError/>}/>
                                    <Route exact path="/" element={<Index/>}/>
                                    <Route path="*" element={<NotFoundError/>}/>
                                </Routes>
                            </section>
                            <div>
                                {/* DEVELOPERS NOTE: Mobile tab-bar menu can go here */}
                            </div>
                            <footer class="footer is-hidden">
                                <div class="container">
                                    <div class="content has-text-centered">
                                        <p>Hello</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </Router>
            </RecoilRoot>
        </div>
    );
}

export default AppRoute;
