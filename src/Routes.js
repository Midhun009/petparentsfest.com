import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/home/homepage";
import RegisterationForm from "./components/pages/registeration";
import Tickets from "./components/pages/tickets";
import ReferralRegistration from "./components/pages/Referral/ReferralRegistration";
import ReferralTickets from "./components/pages/Referral/ReferralTickets";
import NotFound from "./components/pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pet-register" element={<RegisterationForm />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/referral-registration" element={<ReferralRegistration />} />
      <Route path="/referral-tickets/:slug/" element={<ReferralTickets />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
