import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../Utils/data';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../Utils/apiPaths';
import moment from 'moment';
import SummaryCard from '../../components/cards/SummaryCard';
import axiosInstance from '../../Utils/axiosInstance';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSIONS.DELETE(sessionData?._id));
      toast.success('Session Deleted Successfully');
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      console.error('Error deleting session data:', error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 pt-10 pb-20 text-white">
        {/* Title */}
        <div className="text-2xl md:text-3xl font-bold mb-10 text-violet-100 text-center">
          Your Interview Sessions
        </div>

        {/* Content */}
        {sessions.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-lg font-medium">
            No sessions created yet. Click{" "}
            <span className="text-violet-400 underline">Add New</span> to start!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
            {sessions.map((data, index) => (
              <div
                key={data._id}
                className="rounded-2xl p-1 bg-gradient-to-br from-violet-700/30 to-indigo-700/20 shadow-xl hover:shadow-violet-800/40 hover:scale-[1.015] transition-all duration-300"
              >
                <div className="bg-slate-900/70 backdrop-blur-md p-5 rounded-2xl h-full border border-slate-800">
                  <SummaryCard
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ''}
                    topicsToFocus={data?.topicsToFocus || ''}
                    experience={data?.experience || '-'}
                    questions={data?.description || ''}
                    description={data?.description || ''}
                    lastUpdated={
                      data?.updatedAt
                        ? moment(data.updatedAt).format('Do MMM YYYY')
                        : ''
                    }
                    onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                    onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Button */}
        <button
          className="group fixed bottom-10 md:bottom-16 right-6 md:right-16 bg-gradient-to-r from-fuchsia-600 to-violet-500 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-fuchsia-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-xl group-hover:rotate-90 transition-transform" />
          Add New
        </button>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
      >
        <div className="w-full md:w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
