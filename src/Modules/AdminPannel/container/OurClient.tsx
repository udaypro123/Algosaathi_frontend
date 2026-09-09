
import {
    Box,
    Typography,
    Paper,
    Stack,
    Button,
    Chip,
    TextField,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    InputAdornment,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    CircularProgress,
    Alert,
    Snackbar,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import api from "../../../API/api";
import { addClient, DeleteClient, getAllClient, UpdateClient } from "../api/api";
import { useGlobalToast } from "../../../common/GlobalToast";


// ============================================================
// TYPES
// ============================================================

interface Client {
    _id: string;
    fullName: string;
    link: string;
    phoneNumber: number | string;
    address: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ClientForm {
    fullName: string;
    link: string;
    phoneNumber: string;
    address: string;
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalClients: number;
    limit: number;
}


// ============================================================
// INITIAL FORM
// ============================================================

const initialForm: ClientForm = {
    fullName: "",
    link: "",
    phoneNumber: "",
    address: "",
};


// ============================================================
// COMPONENT
// ============================================================

const OurClient = () => {

    // ========================================================
    // STATES
    // ========================================================

    const [clients, setClients] = useState<Client[]>([]);

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(10);
    const { showToast } = useGlobalToast();
    const [pagination, setPagination] =
        useState<PaginationData>({
            currentPage: 1,
            totalPages: 1,
            totalClients: 0,
            limit: 10,
        });


    // ========================================================
    // MODAL STATES
    // ========================================================

    const [openFormModal, setOpenFormModal] =
        useState(false);

    const [openDeleteModal, setOpenDeleteModal] =
        useState(false);


    const [editingClient, setEditingClient] =
        useState<Client | null>(null);

    const [selectedClient, setSelectedClient] =
        useState<Client | null>(null);


    // ========================================================
    // FORM
    // ========================================================

    const [form, setForm] =
        useState<ClientForm>(initialForm);


    const [errors, setErrors] =
        useState<Partial<ClientForm>>({});


    // ========================================================
    // SNACKBAR
    // ========================================================

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as
            "success" |
            "error" |
            "warning" |
            "info",
    });


    // ========================================================
    // API RESPONSE NORMALIZER
    // ========================================================

    const normalizeClientsResponse = (
        response: any
    ) => {

        const data = response?.data || response?.data?.data || {};
        console.log("data-----> ", data)

        return {
            clients: data || [],

            currentPage: Number(data?.currentPage) || 1,

            totalPages: Number(data?.totalPages) || 1,

            totalClients: Number(data?.length) ||
                Number(data?.total) ||
                0,
        };
    };


    // ========================================================
    // GET ALL CLIENTS
    // ========================================================

    const getAllClients = useCallback(
        async () => {

            try {

                setLoading(true);
                const response = await getAllClient()
                const result = normalizeClientsResponse(response);

                setClients(result.clients);

                setPagination({
                    currentPage:
                        result.currentPage,

                    totalPages:
                        result.totalPages,

                    totalClients:
                        result.totalClients,

                    limit,
                });

                setSnackbar({
                    open: true,
                    message:
                        response?.message ||
                        "Data fetch successfully",
                    severity: "success",
                });


            } catch (error: any) {

                console.error(
                    "Get clients error:",
                    error
                );


                setSnackbar({
                    open: true,
                    message:
                        error?.response?.data?.message ||
                        "Unable to fetch clients",
                    severity: "error",
                });

            } finally {

                setLoading(false);

            }

        },
        [
            page,
            limit,
            search,
        ]
    );


    // ========================================================
    // INITIAL GET
    // ========================================================

    useEffect(() => {

        getAllClients();

    }, [getAllClients]);


    // ========================================================
    // OPEN ADD MODAL
    // ========================================================

    const handleOpenAdd = () => {

        setEditingClient(null);

        setForm(initialForm);

        setErrors({});

        setOpenFormModal(true);

    };


    // ========================================================
    // OPEN EDIT MODAL
    // ========================================================

    const handleOpenEdit = (
        client: Client
    ) => {

        setEditingClient(client);

        setForm({
            fullName:
                client.fullName || "",

            link:
                client.link || "",

            phoneNumber:
                String(client.phoneNumber || ""),

            address:
                client.address || "",
        });

        setErrors({});

        setOpenFormModal(true);

    };


    // ========================================================
    // CLOSE FORM MODAL
    // ========================================================

    const handleCloseForm = () => {

        if (saving) return;

        setOpenFormModal(false);

        setEditingClient(null);

        setForm(initialForm);

        setErrors({});

    };


    // ========================================================
    // INPUT CHANGE
    // ========================================================

    const handleChange = (
        field: keyof ClientForm,
        value: string
    ) => {

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));


        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));

    };


    // ========================================================
    // FORM VALIDATION
    // ========================================================

    const validateForm = () => {

        const newErrors:
            Partial<ClientForm> = {};


        if (!form.fullName.trim()) {

            newErrors.fullName =
                "Client name is required";

        }


        if (!form.phoneNumber.trim()) {

            newErrors.phoneNumber =
                "Phone number is required";

        } else if (
            !/^[0-9]{10,15}$/.test(
                form.phoneNumber.trim()
            )
        ) {

            newErrors.phoneNumber =
                "Enter a valid phone number";

        }


        if (
            form.link.trim() &&
            !/^https?:\/\/.+/i.test(
                form.link.trim()
            )
        ) {

            newErrors.link =
                "Link must start with http:// or https://";

        }


        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );

    };


    // ========================================================
    // CREATE CLIENT
    // ========================================================

    const createClient = async () => {

        try {

            const payload: any = {
                fullName:
                    form.fullName.trim(),

                link:
                    form.link.trim(),

                phoneNumber:
                    Number(form.phoneNumber),

                address:
                    form.address.trim(),
            }

            const resposnse = await addClient(payload);
            console.log(resposnse)

            showToast(resposnse.message, "success")

            // setSnackbar({
            //     open: true,
            //     message:
            //         resposnse?.message ||
            //         "Client Add Successfully",
            //     severity: "success",
            // });

        } catch (error: any) {
            showToast(error.message, "error")
        }



    };


    // ========================================================
    // UPDATE CLIENT
    // ========================================================

    const updateClient = async () => {

        if (!editingClient) return;
        const payload = {
            _id: editingClient?._id,
            fullName:
                form.fullName.trim(),

            link:
                form.link.trim(),

            phoneNumber:
                Number(form.phoneNumber),

            address:
                form.address.trim(),

        }
        await UpdateClient(payload)


    };


    // ========================================================
    // SUBMIT FORM
    // ========================================================

    const handleSubmit = async () => {

        if (!validateForm()) return;


        try {

            setSaving(true);


            if (editingClient) {

                await updateClient();

                setSnackbar({
                    open: true,
                    message: "Client updated successfully",
                    severity: "success",
                });

            } else {

                await createClient();


                setSnackbar({
                    open: true,
                    message:
                        "Client added successfully",
                    severity: "success",
                });

            }


            handleCloseForm();


            // Refresh table
            getAllClients();


        } catch (error: any) {

            console.error(
                "Save client error:",
                error
            );


            setSnackbar({
                open: true,
                message:
                    error?.response?.data?.message ||
                    "Unable to save client",
                severity: "error",
            });

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // OPEN DELETE MODAL
    // ========================================================

    const handleOpenDelete = (
        client: Client
    ) => {

        setSelectedClient(client);

        setOpenDeleteModal(true);

    };


    // ========================================================
    // CLOSE DELETE MODAL
    // ========================================================

    const handleCloseDelete = () => {

        if (deleting) return;

        setOpenDeleteModal(false);

        setSelectedClient(null);

    };


    // ========================================================
    // DELETE CLIENT
    // ========================================================

    const handleDelete = async () => {

        if (!selectedClient) return;


        try {

            setDeleting(true);


            /*
             * APNA DELETE API YAHAN LAGANA HAI
             *
             * Example:
             *
             * await api.delete(
             *    `/our-client/${selectedClient._id}`
             * );
             */

            const id:any= selectedClient._id

            await DeleteClient( id);


            setSnackbar({
                open: true,
                message:
                    "Client deleted successfully",
                severity: "success",
            });


            handleCloseDelete();


            /*
             * Agar current page ka last item delete
             * ho gaya hai to previous page par chale jayenge.
             */

            if (
                clients.length === 1 &&
                page > 1
            ) {

                setPage(
                    (prev) => prev - 1
                );

            } else {

                getAllClients();

            }


        } catch (error: any) {

            console.error(
                "Delete client error:",
                error
            );


            setSnackbar({
                open: true,
                message:
                    error?.response?.data?.message ||
                    "Unable to delete client",
                severity: "error",
            });

        } finally {

            setDeleting(false);

        }

    };


    // ========================================================
    // PAGE CHANGE
    // ========================================================

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {

        setPage(value);

    };


    // ========================================================
    // LIMIT CHANGE
    // ========================================================

    const handleLimitChange = (
        event: any
    ) => {

        const newLimit =
            Number(event.target.value);

        setLimit(newLimit);

        setPage(1);

    };


    // ========================================================
    // SEARCH
    // ========================================================

    const handleSearchChange = (
        value: string
    ) => {

        setSearch(value);

        setPage(1);

    };


    // ========================================================
    // CLIENT INITIAL
    // ========================================================

    const getInitial = (
        name: string
    ) => {

        return (
            name
                ?.trim()
                ?.charAt(0)
                ?.toUpperCase() || "C"
        );

    };


    // ========================================================
    // DATE FORMAT
    // ========================================================

    const formatDate = (
        date?: string
    ) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // ========================================================
    // STATS
    // ========================================================

    const stats = useMemo(() => {

        return [
            {
                label: "Total Clients",
                value:
                    pagination.totalClients,
                icon:
                    <PeopleAltIcon />,
            },

            {
                label: "Current Page",
                value:
                    clients.length,
                icon:
                    <BusinessIcon />,
            },
        ];

    }, [
        pagination.totalClients,
        clients.length,
    ]);


    // ========================================================
    // UI
    // ========================================================

    return (

        <Box
            sx={{
                minHeight: "100vh",
                maxWidth: "95%",
                margin: "auto",
                borderRadius: "1rem",
                background:
                    "linear-gradient(180deg, #f7fafc 0%, #eef5f8 100%)",
                p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
            }}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <Box
                sx={{
                    maxWidth: "80%",
                    mx: "auto",
                }}
            >

                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 2.5,
                            md: 3.5,
                        },

                        borderRadius: 4,

                        color: "#fff",

                        background:
                            "linear-gradient(135deg, #064b66 0%, #087594 55%, #0a617b 100%)",

                        boxShadow:
                            "0 15px 40px rgba(6,75,102,0.20)",
                    }}
                >

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}

                        spacing={3}
                        sx={{
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            }, justifyContent: "space-between"
                        }}
                    >

                        <Box>

                            <Stack
                                direction="row"
                                sx={{ alignItems: "center" }}
                                spacing={1.5}
                            >

                                <Avatar
                                    sx={{
                                        bgcolor:
                                            "rgba(255,255,255,0.16)",
                                        width: 48,
                                        height: 48,
                                    }}
                                >
                                    <BusinessIcon />
                                </Avatar>

                                <Box>

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: {
                                                xs: "1.6rem",
                                                md: "2rem",
                                            },
                                        }}
                                    >
                                        Our Clients
                                    </Typography>

                                    <Typography
                                        sx={{
                                            opacity: 0.8,
                                            mt: 0.3,
                                        }}
                                    >
                                        Manage your clients
                                        and business portfolio
                                    </Typography>

                                </Box>

                            </Stack>

                        </Box>


                        <Stack
                            direction="row"
                            spacing={1.5}
                        >

                            <Tooltip title="Refresh">

                                <IconButton
                                    onClick={
                                        getAllClients
                                    }
                                    disabled={loading}
                                    sx={{
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.3)",
                                    }}
                                >
                                    <RefreshIcon />
                                </IconButton>

                            </Tooltip>


                            <Button
                                variant="contained"
                                startIcon={
                                    <AddIcon />
                                }
                                onClick={
                                    handleOpenAdd
                                }
                                sx={{
                                    px: 2.5,
                                    py: 1.2,
                                    borderRadius: 2.5,
                                    bgcolor: "#fff",
                                    color: "#075d7e",
                                    fontWeight: 700,
                                    "&:hover": {
                                        bgcolor:
                                            "#f0f6f8",
                                    },
                                }}
                            >
                                Add Client
                            </Button>

                        </Stack>

                    </Stack>

                </Paper>


                {/* ==================================================
                    STATS
                ================================================== */}

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    sx={{
                        mt: 2.5,
                    }}
                >

                    {stats.map((item) => (

                        <Paper
                            key={item.label}
                            elevation={0}
                            sx={{
                                flex: 1,
                                p: 2.2,
                                borderRadius: 3,
                                border:
                                    "1px solid #e3edf1",
                            }}
                        >

                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{ alignItems: "center" }}
                            >

                                <Avatar
                                    sx={{
                                        bgcolor:
                                            "#e8f4f8",
                                        color:
                                            "#075d7e",
                                    }}
                                >
                                    {item.icon}
                                </Avatar>

                                <Box>

                                    <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 800 }}
                                    >
                                        {item.value}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item.label}
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    ))}

                </Stack>


                {/* ==================================================
                    TABLE CARD
                ================================================== */}

                <Paper
                    elevation={0}
                    sx={{
                        mt: 2.5,
                        borderRadius: 4,
                        border:
                            "1px solid #e1ebef",
                        overflow: "hidden",
                    }}
                >

                    {/* SEARCH BAR */}

                    <Box
                        sx={{
                            p: {
                                xs: 2,
                                md: 2.5,
                            },
                        }}
                    >

                        <Stack
                            direction={{
                                xs: "column",
                                md: "row",
                            }}
                            spacing={2}
                            sx={{
                                alignItems: {
                                    xs: "stretch",
                                    md: "center",
                                },
                                justifyContent: "space-between",
                            }}
                        >

                            <TextField
                                value={search}
                                onChange={(e) =>
                                    handleSearchChange(
                                        e.target.value
                                    )
                                }
                                placeholder="Search client by name, phone or address..."
                                size="small"
                                sx={{
                                    maxWidth: {
                                        md: 500,
                                    },
                                    width: "100%",
                                }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon
                                                    color="action"
                                                />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />


                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 1,
                                    alignItems: "center",
                                    justifyContent: {
                                        xs: "space-between",
                                        md: "flex-end",
                                    },
                                }}
                            >

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Rows:
                                </Typography>


                                <FormControl
                                    size="small"
                                    sx={{
                                        minWidth: 85,
                                    }}
                                >

                                    <Select
                                        value={limit}
                                        onChange={
                                            handleLimitChange
                                        }
                                    >

                                        <MenuItem value={5}>
                                            5
                                        </MenuItem>

                                        <MenuItem value={10}>
                                            10
                                        </MenuItem>

                                        <MenuItem value={20}>
                                            20
                                        </MenuItem>

                                        <MenuItem value={50}>
                                            50
                                        </MenuItem>

                                    </Select>

                                </FormControl>

                            </Box>

                        </Stack>

                    </Box>


                    <Divider />


                    {/* ==================================================
                        TABLE
                    ================================================== */}

                    <TableContainer
                        sx={{
                            maxHeight: 570,
                            overflowX: "auto",
                        }}
                    >

                        <Table
                            stickyHeader
                            sx={{
                                minWidth: 900,
                            }}
                        >

                            <TableHead>

                                <TableRow>

                                    <TableCell
                                        sx={{
                                            fontWeight: 800,
                                            bgcolor: "#f7fafc",
                                        }}
                                    >
                                        Client
                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            fontWeight: 800,
                                            bgcolor: "#f7fafc",
                                        }}
                                    >
                                        Contact
                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            fontWeight: 800,
                                            bgcolor: "#f7fafc",
                                        }}
                                    >
                                        Website
                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            fontWeight: 800,
                                            bgcolor: "#f7fafc",
                                        }}
                                    >
                                        Address
                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            fontWeight: 800,
                                            bgcolor: "#f7fafc",
                                        }}
                                    >
                                        Added On
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontWeight: 800,
                                            bgcolor: "#f7fafc",
                                        }}
                                    >
                                        Actions
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {loading ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={6}
                                            align="center"
                                            sx={{
                                                py: 8,
                                            }}
                                        >

                                            <CircularProgress
                                                size={32}
                                            />

                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    mt: 1.5,
                                                }}
                                            >
                                                Loading clients...
                                            </Typography>

                                        </TableCell>

                                    </TableRow>

                                ) : clients.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={6}
                                            align="center"
                                            sx={{
                                                py: 8,
                                            }}
                                        >

                                            <Avatar
                                                sx={{
                                                    mx: "auto",
                                                    mb: 1.5,
                                                    width: 60,
                                                    height: 60,
                                                    bgcolor:
                                                        "#edf4f7",
                                                    color:
                                                        "#075d7e",
                                                }}
                                            >
                                                <PeopleAltIcon
                                                    fontSize="large"
                                                />
                                            </Avatar>

                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 700 }}
                                            >
                                                No clients found
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    mt: 0.5,
                                                }}
                                            >
                                                Add your first client
                                                to get started.
                                            </Typography>

                                            <Button
                                                variant="contained"
                                                startIcon={
                                                    <AddIcon />
                                                }
                                                onClick={
                                                    handleOpenAdd
                                                }
                                                sx={{
                                                    mt: 2,
                                                    borderRadius: 2,
                                                    bgcolor:
                                                        "#075d7e",
                                                }}
                                            >
                                                Add Client
                                            </Button>

                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    clients.map(
                                        (client) => (

                                            <TableRow
                                                key={
                                                    client._id
                                                }
                                                hover
                                            >

                                                {/* CLIENT */}

                                                <TableCell>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1.5}
                                                        sx={{ alignItems: "center" }}
                                                    >

                                                        <Avatar
                                                            sx={{
                                                                bgcolor:
                                                                    "#e8f4f8",
                                                                color:
                                                                    "#075d7e",
                                                                fontWeight:
                                                                    700,
                                                            }}
                                                        >
                                                            {
                                                                getInitial(
                                                                    client.fullName
                                                                )
                                                            }
                                                        </Avatar>

                                                        <Box>

                                                            <Typography
                                                                sx={{
                                                                    fontWeight:
                                                                        700
                                                                }}
                                                            >
                                                                {
                                                                    client.fullName
                                                                }
                                                            </Typography>

                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                            >
                                                                Client
                                                            </Typography>

                                                        </Box>

                                                    </Stack>

                                                </TableCell>


                                                {/* PHONE */}

                                                <TableCell>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        sx={{ alignItems: "center" }}
                                                    >

                                                        <PhoneIcon
                                                            sx={{
                                                                fontSize: 18,
                                                                color:
                                                                    "text.secondary",
                                                            }}
                                                        />

                                                        <Typography>
                                                            {
                                                                client.phoneNumber
                                                            }
                                                        </Typography>

                                                    </Stack>

                                                </TableCell>


                                                {/* LINK */}

                                                <TableCell>

                                                    {client.link ? (

                                                        <Button
                                                            component="a"
                                                            href={
                                                                client.link
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            size="small"
                                                            startIcon={
                                                                <OpenInNewIcon />
                                                            }
                                                            sx={{
                                                                textTransform:
                                                                    "none",
                                                                borderRadius:
                                                                    2,
                                                            }}
                                                        >
                                                            Visit Website
                                                        </Button>

                                                    ) : (

                                                        <Chip
                                                            size="small"
                                                            label="No website"
                                                            variant="outlined"
                                                        />

                                                    )}

                                                </TableCell>


                                                {/* ADDRESS */}

                                                <TableCell>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        sx={{ alignItems: "center" }}
                                                    >

                                                        <LocationOnIcon
                                                            sx={{
                                                                fontSize: 18,
                                                                color:
                                                                    "text.secondary",
                                                            }}
                                                        />

                                                        <Typography
                                                            sx={{
                                                                maxWidth: 220,
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {
                                                                client.address ||
                                                                "-"
                                                            }
                                                        </Typography>

                                                    </Stack>

                                                </TableCell>


                                                {/* DATE */}

                                                <TableCell>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            formatDate(
                                                                client.createdAt
                                                            )
                                                        }
                                                    </Typography>

                                                </TableCell>


                                                {/* ACTIONS */}

                                                <TableCell
                                                    align="right"
                                                >

                                                    <Stack
                                                        direction="row"
                                                        spacing={0.5}
                                                        sx={{ justifyContent: "flex-end" }}
                                                    >

                                                        <Tooltip title="Edit Client">

                                                            <IconButton
                                                                onClick={() =>
                                                                    handleOpenEdit(
                                                                        client
                                                                    )
                                                                }
                                                                sx={{
                                                                    color:
                                                                        "#075d7e",
                                                                    bgcolor:
                                                                        "#edf7fa",
                                                                    "&:hover":
                                                                    {
                                                                        bgcolor:
                                                                            "#d9edf3",
                                                                    },
                                                                }}
                                                            >
                                                                <EditIcon
                                                                    fontSize="small"
                                                                />
                                                            </IconButton>

                                                        </Tooltip>


                                                        <Tooltip title="Delete Client">

                                                            <IconButton
                                                                onClick={() =>
                                                                    handleOpenDelete(
                                                                        client
                                                                    )
                                                                }
                                                                sx={{
                                                                    color:
                                                                        "#d32f2f",
                                                                    bgcolor:
                                                                        "#fff1f1",
                                                                    "&:hover":
                                                                    {
                                                                        bgcolor:
                                                                            "#ffe0e0",
                                                                    },
                                                                }}
                                                            >
                                                                <DeleteIcon
                                                                    fontSize="small"
                                                                />
                                                            </IconButton>

                                                        </Tooltip>

                                                    </Stack>

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )

                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>


                    {/* ==================================================
                        PAGINATION
                    ================================================== */}

                    <Divider />


                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",

                        }}
                        spacing={2}

                        sx={{
                            p: 2.2,
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Showing{" "}
                            <b>
                                {clients.length}
                            </b>{" "}
                            of{" "}
                            <b>
                                {
                                    pagination.totalClients
                                }
                            </b>{" "}
                            clients
                        </Typography>


                        <Pagination
                            count={
                                Math.max(
                                    pagination.totalPages,
                                    1
                                )
                            }
                            page={page}
                            onChange={
                                handlePageChange
                            }
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                        />

                    </Stack>

                </Paper>

            </Box>


            {/* =========================================================
                ADD / EDIT MODAL
            ========================================================== */}

            <Dialog
                open={openFormModal}
                onClose={handleCloseForm}
                fullWidth
                maxWidth="sm"
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",

                }}
            >

                <DialogTitle
                    sx={{
                        p: 0,
                    }}
                >

                    <Box
                        sx={{
                            p: 2,
                            background:
                                "linear-gradient(135deg,#075d7e,#0b718f)",
                            color: "#fff",
                        }}
                    >

                        <Stack
                            direction="row"
                            sx={{ alignItems: "center", justifyContent: "space-between" }}
                        >

                            <Stack
                                spacing={1.5}
                                sx={{ alignItems: "center", }}
                            >
                                <Box>

                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 800 }}
                                    >
                                        {editingClient
                                            ? "Edit Client"
                                            : "Add New Client"}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            opacity: 0.8,
                                        }}
                                    >
                                        {editingClient
                                            ? "Update client information"
                                            : "Add a new client to your portfolio"}
                                    </Typography>

                                </Box>

                            </Stack>


                            <IconButton
                                onClick={
                                    handleCloseForm
                                }
                                disabled={saving}
                                sx={{
                                    color: "#fff",
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                        </Stack>

                    </Box>

                </DialogTitle>


                <DialogContent
                    sx={{
                        p: 3,
                    }}
                >

                    <Stack
                        spacing={2.2}
                        sx={{
                            mt: 3,
                        }}
                    >

                        {/* FULL NAME */}

                        <TextField
                            fullWidth
                            label="Client Name"
                            placeholder="Enter client name"
                            value={
                                form.fullName
                            }
                            onChange={(e) =>
                                handleChange(
                                    "fullName",
                                    e.target.value
                                )
                            }
                            error={
                                !!errors.fullName
                            }
                            helperText={
                                errors.fullName
                            }
                            required
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BusinessIcon
                                                color="action"
                                            />
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />


                        {/* PHONE */}

                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="Enter phone number"
                            value={
                                form.phoneNumber
                            }
                            onChange={(e) =>
                                handleChange(
                                    "phoneNumber",
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            error={
                                !!errors.phoneNumber
                            }
                            helperText={
                                errors.phoneNumber
                            }
                            required
                            sx={{ maxLength: 15, }}

                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon
                                                color="action"
                                            />
                                        </InputAdornment>
                                    ),
                                }

                            }}
                        />


                        {/* WEBSITE */}

                        <TextField
                            fullWidth
                            label="Website / Profile Link"
                            placeholder="https://example.com"
                            value={
                                form.link
                            }
                            onChange={(e) =>
                                handleChange(
                                    "link",
                                    e.target.value
                                )
                            }
                            error={
                                !!errors.link
                            }
                            helperText={
                                errors.link ||
                                "Optional"
                            }
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LanguageIcon
                                                color="action"
                                            />
                                        </InputAdornment>
                                    ),
                                }

                            }}
                        />


                        {/* ADDRESS */}

                        <TextField
                            fullWidth
                            label="Address"
                            placeholder="Enter client address"
                            value={
                                form.address
                            }
                            onChange={(e) =>
                                handleChange(
                                    "address",
                                    e.target.value
                                )
                            }
                            multiline
                            rows={3}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                alignSelf:
                                                    "flex-start",
                                                mt: 1.5,
                                            }}
                                        >
                                            <LocationOnIcon
                                                color="action"
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                    </Stack>

                </DialogContent>


                <DialogActions
                    sx={{
                        p: 3,
                        pt: 1,
                    }}
                >

                    <Button
                        onClick={
                            handleCloseForm
                        }
                        disabled={saving}
                        sx={{
                            borderRadius: 2,
                        }}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="contained"
                        onClick={
                            handleSubmit
                        }
                        disabled={saving}
                        startIcon={
                            saving ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            ) : editingClient ? (
                                <EditIcon />
                            ) : (
                                <AddIcon />
                            )
                        }
                        sx={{
                            minWidth: 130,
                            borderRadius: 2,
                            bgcolor:
                                "#075d7e",
                            fontWeight: 700,
                        }}
                    >
                        {saving
                            ? "Saving..."
                            : editingClient
                                ? "Update Client"
                                : "Add Client"}
                    </Button>

                </DialogActions>

            </Dialog>


            {/* =========================================================
                DELETE MODAL
            ========================================================== */}

            <Dialog
                open={openDeleteModal}
                onClose={handleCloseDelete}
                maxWidth="xs"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 4,
                        },
                    },
                }}
            >

                <DialogContent
                    sx={{
                        p: 4,
                        textAlign: "center",
                    }}
                >

                    <Avatar
                        sx={{
                            mx: "auto",
                            mb: 2,
                            width: 64,
                            height: 64,
                            bgcolor: "#fff0f0",
                            color: "#d32f2f",
                        }}
                    >
                        <WarningAmberIcon
                            fontSize="large"
                        />
                    </Avatar>


                    <Typography
                        sx={{ fontWeight: 800 }}
                        variant="h6"
                    >
                        Delete Client?
                    </Typography>


                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 1,
                        }}
                    >
                        Are you sure you want to
                        delete{" "}
                        <b>
                            {
                                selectedClient?.fullName
                            }
                        </b>
                        ? This action cannot be
                        undone.
                    </Typography>


                    <Stack
                        spacing={1.5}
                        sx={{
                            mt: 3,
                            direction: "row",
                            justifyContent: "center"
                        }}
                    >

                        <Button
                            variant="outlined"
                            onClick={
                                handleCloseDelete
                            }
                            disabled={deleting}
                            sx={{
                                borderRadius: 2,
                            }}
                        >
                            Cancel
                        </Button>


                        <Button
                            variant="contained"
                            color="error"
                            onClick={
                                handleDelete
                            }
                            disabled={deleting}
                            startIcon={
                                deleting ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                ) : (
                                    <DeleteIcon />
                                )
                            }
                            sx={{
                                borderRadius: 2,
                                minWidth: 120,
                            }}
                        >
                            {deleting
                                ? "Deleting..."
                                : "Delete"}
                        </Button>

                    </Stack>

                </DialogContent>

            </Dialog>


            {/* =========================================================
                SNACKBAR
            ========================================================== */}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >

                <Alert
                    severity={
                        snackbar.severity
                    }
                    variant="filled"
                    onClose={() =>
                        setSnackbar((prev) => ({
                            ...prev,
                            open: false,
                        }))
                    }
                    sx={{
                        minWidth: 280,
                    }}
                >
                    {snackbar.message}
                </Alert>

            </Snackbar>

        </Box>
    );
};


export default OurClient;
