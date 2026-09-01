import React, { useEffect, useRef, useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddPhotoAlternateOutlined,
    CloudUploadOutlined,
    LocationOnOutlined,
    ReportProblemOutlined,
    VideoCameraBackOutlined,
} from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";

/* -------------------------------------------------------------------------- */
/*                                TYPES                                       */
/* -------------------------------------------------------------------------- */

interface ImageFile {
    file: File;
    preview: string;
}

interface Village {
    id: string;
    name: string;
}

interface Block {
    id: string;
    name: string;
    villages: Village[];
}

interface District {
    id: string;
    name: string;
    blocks: Block[];
}

interface StateData {
    id: string;
    name: string;
    districts: District[];
}

interface ComplaintFormData {
    title: string;
    description: string;
    category: string;
    priority: string;

    state: string;
    district: string;
    block: string;
    village: string;

    area: string;
    landmark: string;
    pincode: string;
}

/* -------------------------------------------------------------------------- */
/*                         LOCATION MASTER DATA                               */
/* -------------------------------------------------------------------------- */

const locationData: StateData[] = [
    {
        id: "up",
        name: "Uttar Pradesh",
        districts: [
            {
                id: "lucknow",
                name: "Lucknow",
                blocks: [
                    {
                        id: "mohanlalganj",
                        name: "Mohanlalganj",
                        villages: [
                            { id: "nagram", name: "Nagram" },
                            { id: "gosainganj", name: "Gosainganj" },
                            { id: "samesi", name: "Samesi" },
                        ],
                    },
                    {
                        id: "malihabad",
                        name: "Malihabad",
                        villages: [
                            { id: "malihabad-town", name: "Malihabad" },
                            { id: "rahimabad", name: "Rahimabad" },
                            { id: "kasmandi", name: "Kasmandi" },
                        ],
                    },
                ],
            },
            {
                id: "kanpur-nagar",
                name: "Kanpur Nagar",
                blocks: [
                    {
                        id: "kakwan",
                        name: "Kakwan",
                        villages: [
                            { id: "kakwan-village", name: "Kakwan" },
                            { id: "shivrajpur", name: "Shivrajpur" },
                        ],
                    },
                    {
                        id: "bilhaur",
                        name: "Bilhaur",
                        villages: [
                            { id: "bithoor", name: "Bithoor" },
                            { id: "chaubepur", name: "Chaubepur" },
                        ],
                    },
                ],
            },
            {
                id: "prayagraj",
                name: "Prayagraj",
                blocks: [
                    {
                        id: "chaka",
                        name: "Chaka",
                        villages: [
                            { id: "chaka-village", name: "Chaka" },
                            { id: "naini", name: "Naini" },
                        ],
                    },
                ],
            },
        ],
    },

    {
        id: "delhi",
        name: "Delhi",
        districts: [
            {
                id: "central-delhi",
                name: "Central Delhi",
                blocks: [
                    {
                        id: "karol-bagh",
                        name: "Karol Bagh",
                        villages: [
                            { id: "pusa", name: "Pusa" },
                            { id: "patel-nagar", name: "Patel Nagar" },
                        ],
                    },
                ],
            },
        ],
    },

    {
        id: "bihar",
        name: "Bihar",
        districts: [
            {
                id: "patna",
                name: "Patna",
                blocks: [
                    {
                        id: "danapur",
                        name: "Danapur",
                        villages: [
                            { id: "danapur-village", name: "Danapur" },
                            { id: "maner", name: "Maner" },
                        ],
                    },
                ],
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                              COMPONENT                                     */
/* -------------------------------------------------------------------------- */

const CreateComplaint: React.FC = () => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<ImageFile[]>([]);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<ComplaintFormData>({
        title: "",
        description: "",
        category: "",
        priority: "",

        state: "",
        district: "",
        block: "",
        village: "",

        area: "",
        landmark: "",
        pincode: "",
    });

    /* ------------------------------------------------------------------------ */
    /*                         SELECTED LOCATION                                */
    /* ------------------------------------------------------------------------ */

    const selectedState = locationData.find(
        (state) => state.id === formData.state
    );

    const selectedDistrict = selectedState?.districts.find(
        (district) => district.id === formData.district
    );

    const selectedBlock = selectedDistrict?.blocks.find(
        (block) => block.id === formData.block
    );

    const selectedVillage = selectedBlock?.villages.find(
        (village) => village.id === formData.village
    );

    const districts = selectedState?.districts ?? [];
    const blocks = selectedDistrict?.blocks ?? [];
    const villages = selectedBlock?.villages ?? [];

    /* ------------------------------------------------------------------------ */
    /*                         NORMAL INPUT                                     */
    /* ------------------------------------------------------------------------ */

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* ------------------------------------------------------------------------ */
    /*                         GENERIC SELECT                                   */
    /* ------------------------------------------------------------------------ */

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* ------------------------------------------------------------------------ */
    /*                         STATE CHANGE                                     */
    /* ------------------------------------------------------------------------ */

    const handleStateChange = (
        event: SelectChangeEvent<string>
    ) => {
        const stateId = event.target.value;

        setFormData((prev) => ({
            ...prev,
            state: stateId,
            district: "",
            block: "",
            village: "",
        }));
    };

    /* ------------------------------------------------------------------------ */
    /*                         DISTRICT CHANGE                                  */
    /* ------------------------------------------------------------------------ */

    const handleDistrictChange = (
        event: SelectChangeEvent<string>
    ) => {
        const districtId = event.target.value;

        setFormData((prev) => ({
            ...prev,
            district: districtId,
            block: "",
            village: "",
        }));
    };

    /* ------------------------------------------------------------------------ */
    /*                         BLOCK CHANGE                                     */
    /* ------------------------------------------------------------------------ */

    const handleBlockChange = (
        event: SelectChangeEvent<string>
    ) => {
        const blockId = event.target.value;

        setFormData((prev) => ({
            ...prev,
            block: blockId,
            village: "",
        }));
    };

    /* ------------------------------------------------------------------------ */
    /*                         VILLAGE CHANGE                                   */
    /* ------------------------------------------------------------------------ */

    const handleVillageChange = (
        event: SelectChangeEvent<string>
    ) => {
        const villageId = event.target.value;

        setFormData((prev) => ({
            ...prev,
            village: villageId,
        }));
    };

    /* ------------------------------------------------------------------------ */
    /*                         IMAGE UPLOAD                                     */
    /* ------------------------------------------------------------------------ */

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const imageFiles = Array.from(files).filter((file) =>
            file.type.startsWith("image/")
        );

        const selectedFiles: ImageFile[] = imageFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...selectedFiles]);

        event.target.value = "";
    };

    /* ------------------------------------------------------------------------ */
    /*                         REMOVE IMAGE                                     */
    /* ------------------------------------------------------------------------ */

    const removeImage = (index: number) => {
        setImages((prev) => {
            const image = prev[index];

            if (image) {
                URL.revokeObjectURL(image.preview);
            }

            return prev.filter((_, i) => i !== index);
        });
    };

    /* ------------------------------------------------------------------------ */
    /*                         VIDEO UPLOAD                                     */
    /* ------------------------------------------------------------------------ */

    const handleVideoUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("video/")) {
            event.target.value = "";
            return;
        }

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        const preview = URL.createObjectURL(file);

        setVideo(file);
        setVideoPreview(preview);

        event.target.value = "";
    };

    /* ------------------------------------------------------------------------ */
    /*                         REMOVE VIDEO                                     */
    /* ------------------------------------------------------------------------ */

    const removeVideo = () => {
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setVideo(null);
        setVideoPreview(null);
    };

    /* ------------------------------------------------------------------------ */
    /*                         CLEANUP OBJECT URLS                               */
    /* ------------------------------------------------------------------------ */

    useEffect(() => {
        return () => {
            images.forEach((image) => {
                URL.revokeObjectURL(image.preview);
            });

            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, []);

    /* ------------------------------------------------------------------------ */
    /*                         SUBMIT                                           */
    /* ------------------------------------------------------------------------ */

    const handleSubmit = () => {
        if (!formData.title.trim()) {
            return;
        }

        if (!formData.description.trim()) {
            return;
        }

        const complaintPayload = {
            ...formData,

            stateName: selectedState?.name ?? "",
            districtName: selectedDistrict?.name ?? "",
            blockName: selectedBlock?.name ?? "",
            villageName: selectedVillage?.name ?? "",

            images: images.map((image) => image.file),

            video,
        };

        console.log("Complaint Payload:", complaintPayload);
    };

    /* ------------------------------------------------------------------------ */
    /*                         UI                                               */
    /* ------------------------------------------------------------------------ */

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f6f8fb",
                p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
            }}
        >
            <Box
                sx={{
                    maxWidth: 1100,
                    mx: "auto",
                }}
            >
                {/* HEADER */}

                <Box sx={{ mb: 3 }}>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: "center" }}
                    >
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "primary.main",
                                color: "white",
                                flexShrink: 0,
                            }}
                        >
                            <ReportProblemOutlined />
                        </Box>

                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: "#172033",
                                }}
                            >
                                Create Complaint
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Report an issue and provide complete details
                                for faster resolution.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Card
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "#e5e7eb",
                        borderRadius: 3,
                        overflow: "hidden",
                    }}
                >
                    {/* ---------------------------------------------------------------- */}
                    {/* COMPLAINT DETAILS                                                */}
                    {/* ---------------------------------------------------------------- */}

                    <CardContent
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4,
                            },
                        }}
                    >
                        <SectionHeader
                            icon={<ReportProblemOutlined />}
                            title="Complaint Details"
                            subtitle="Tell us what happened"
                        />

                        <Grid container spacing={2.5}>
                            {/* TITLE */}

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Complaint Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Example: Road damaged near main market"
                                />
                            </Grid>

                            {/* CATEGORY */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="complaint-category-label">
                                        Complaint Category
                                    </InputLabel>

                                    <Select
                                        labelId="complaint-category-label"
                                        label="Complaint Category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="road">
                                            Road & Transport
                                        </MenuItem>

                                        <MenuItem value="water">
                                            Water Supply
                                        </MenuItem>

                                        <MenuItem value="electricity">
                                            Electricity
                                        </MenuItem>

                                        <MenuItem value="sanitation">
                                            Sanitation & Waste
                                        </MenuItem>

                                        <MenuItem value="street-light">
                                            Street Light
                                        </MenuItem>

                                        <MenuItem value="drainage">
                                            Drainage
                                        </MenuItem>

                                        <MenuItem value="other">
                                            Other
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* PRIORITY */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="priority-label">
                                        Priority
                                    </InputLabel>

                                    <Select
                                        labelId="priority-label"
                                        label="Priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="low">
                                            Low
                                        </MenuItem>

                                        <MenuItem value="medium">
                                            Medium
                                        </MenuItem>

                                        <MenuItem value="high">
                                            High
                                        </MenuItem>

                                        <MenuItem value="urgent">
                                            Urgent
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* DESCRIPTION */}

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={5}
                                    required
                                    label="Complaint Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the problem in detail..."
                                />
                            </Grid>
                        </Grid>
                    </CardContent>

                    <Divider />

                    {/* ---------------------------------------------------------------- */}
                    {/* LOCATION                                                         */}
                    {/* ---------------------------------------------------------------- */}

                    <CardContent
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4,
                            },
                        }}
                    >
                        <SectionHeader
                            icon={<LocationOnOutlined />}
                            title="Complaint Location"
                            subtitle="Select the exact location of the issue"
                        />

                        <Grid container spacing={2.5}>
                            {/* STATE */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth required>
                                    <InputLabel id="state-label">
                                        State
                                    </InputLabel>

                                    <Select
                                        labelId="state-label"
                                        label="State"
                                        value={formData.state}
                                        onChange={handleStateChange}
                                    >
                                        {locationData.map((state) => (
                                            <MenuItem
                                                key={state.id}
                                                value={state.id}
                                            >
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* DISTRICT */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl
                                    fullWidth
                                    required
                                    disabled={!formData.state}
                                >
                                    <InputLabel id="district-label">
                                        District
                                    </InputLabel>

                                    <Select
                                        labelId="district-label"
                                        label="District"
                                        value={formData.district}
                                        onChange={handleDistrictChange}
                                    >
                                        {districts.map((district) => (
                                            <MenuItem
                                                key={district.id}
                                                value={district.id}
                                            >
                                                {district.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* BLOCK */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl
                                    fullWidth
                                    required
                                    disabled={!formData.district}
                                >
                                    <InputLabel id="block-label">
                                        Block / Tehsil
                                    </InputLabel>

                                    <Select
                                        labelId="block-label"
                                        label="Block / Tehsil"
                                        value={formData.block}
                                        onChange={handleBlockChange}
                                    >
                                        {blocks.map((block) => (
                                            <MenuItem
                                                key={block.id}
                                                value={block.id}
                                            >
                                                {block.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* VILLAGE */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl
                                    fullWidth
                                    required
                                    disabled={!formData.block}
                                >
                                    <InputLabel id="village-label">
                                        Village
                                    </InputLabel>

                                    <Select
                                        labelId="village-label"
                                        label="Village"
                                        value={formData.village}
                                        onChange={handleVillageChange}
                                    >
                                        {villages.map((village) => (
                                            <MenuItem
                                                key={village.id}
                                                value={village.id}
                                            >
                                                {village.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* AREA */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Area / Locality"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="Enter area or locality"
                                />
                            </Grid>

                            {/* PINCODE */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="Enter 6 digit pincode"
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 6,
                                            inputMode: "numeric",
                                        },
                                    }}
                                />
                            </Grid>

                            {/* LANDMARK */}

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Landmark"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                    placeholder="Example: Near Government School"
                                />
                            </Grid>

                        </Grid>
                    </CardContent>

                    <Divider />

                    {/* ---------------------------------------------------------------- */}
                    {/* MEDIA                                                            */}
                    {/* ---------------------------------------------------------------- */}

                    <CardContent
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                                md: 4,
                            },
                        }}
                    >
                        <SectionHeader
                            icon={<CloudUploadOutlined />}
                            title="Photos & Video"
                            subtitle="Upload photos or video as evidence"
                        />

                        {/* HIDDEN INPUTS */}

                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            hidden
                            onChange={handleImageUpload}
                        />

                        <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/mp4,video/quicktime,video/webm"
                            hidden
                            onChange={handleVideoUpload}
                        />

                        <Grid container spacing={2}>
                            {/* IMAGE UPLOAD */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        imageInputRef.current?.click()
                                    }
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            imageInputRef.current?.click();
                                        }
                                    }}
                                    sx={{
                                        minHeight: 170,
                                        border: "2px dashed",
                                        borderColor: "#cbd5e1",
                                        borderRadius: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        bgcolor: "#fafbfc",
                                        transition: "all 0.2s ease",

                                        "&:hover": {
                                            borderColor: "primary.main",
                                            bgcolor: "#f5f8ff",
                                        },
                                    }}
                                >
                                    <AddPhotoAlternateOutlined
                                        sx={{
                                            fontSize: 42,
                                            color: "primary.main",
                                            mb: 1,
                                        }}
                                    />

                                    <Typography sx={{ fontWeight: 600 }}>
                                        Upload Photos
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Select multiple images
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        JPG, PNG, WEBP
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* VIDEO UPLOAD */}

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        videoInputRef.current?.click()
                                    }
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            videoInputRef.current?.click();
                                        }
                                    }}
                                    sx={{
                                        minHeight: 170,
                                        border: "2px dashed",
                                        borderColor: "#cbd5e1",
                                        borderRadius: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        bgcolor: "#fafbfc",
                                        transition: "all 0.2s ease",

                                        "&:hover": {
                                            borderColor: "primary.main",
                                            bgcolor: "#f5f8ff",
                                        },
                                    }}
                                >
                                    <VideoCameraBackOutlined
                                        sx={{
                                            fontSize: 42,
                                            color: "primary.main",
                                            mb: 1,
                                        }}
                                    />

                                    <Typography sx={{ fontWeight: 600 }}>
                                        Upload Video
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Add a video showing the issue
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        MP4, MOV, WEBM
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* IMAGE PREVIEW */}

                        {images.length > 0 && (
                            <Box sx={{ mt: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        mb: 1.5,
                                        fontWeight: 700,
                                    }}
                                >
                                    Uploaded Photos ({images.length})
                                </Typography>

                                <Grid container spacing={1.5}>
                                    {images.map((image, index) => (
                                        <Grid
                                            size={{
                                                xs: 6,
                                                sm: 4,
                                                md: 3,
                                            }}
                                            key={image.preview}
                                        >
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    height: 150,
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                    border: "1px solid #e5e7eb",
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={image.preview}
                                                    alt={`Complaint evidence ${index + 1
                                                        }`}
                                                    sx={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />

                                                <IconButton
                                                    aria-label="Delete image"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    sx={{
                                                        position: "absolute",
                                                        top: 6,
                                                        right: 6,
                                                        bgcolor:
                                                            "rgba(255,255,255,0.92)",

                                                        "&:hover": {
                                                            bgcolor: "white",
                                                            color: "error.main",
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {/* VIDEO PREVIEW */}

                        {videoPreview && (
                            <Box sx={{ mt: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1.5,
                                    }}
                                >
                                    Uploaded Video
                                </Typography>

                                <Box
                                    sx={{
                                        position: "relative",
                                        maxWidth: 500,
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        bgcolor: "#111827",
                                    }}
                                >
                                    <Box
                                        component="video"
                                        src={videoPreview}
                                        controls
                                        sx={{
                                            display: "block",
                                            width: "100%",
                                            maxHeight: 300,
                                        }}
                                    />

                                    <IconButton
                                        aria-label="Delete video"
                                        onClick={removeVideo}
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            bgcolor:
                                                "rgba(255,255,255,0.92)",

                                            "&:hover": {
                                                bgcolor: "white",
                                                color: "error.main",
                                            },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                    </CardContent>

                    <Divider />

                    {/* ---------------------------------------------------------------- */}
                    {/* FOOTER                                                           */}
                    {/* ---------------------------------------------------------------- */}

                    <Box
                        sx={{
                            px: {
                                xs: 2,
                                sm: 3,
                                md: 4,
                            },
                            py: 2.5,
                            bgcolor: "#fafafa",
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1.5,
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                minWidth: 130,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Save Draft
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<ReportProblemOutlined />}
                            onClick={handleSubmit}
                            sx={{
                                minWidth: 160,
                                textTransform: "none",
                                fontWeight: 600,
                                borderRadius: 2,
                                boxShadow: "none",

                                "&:hover": {
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Submit Complaint
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

/* -------------------------------------------------------------------------- */
/*                           SECTION HEADER                                   */
/* -------------------------------------------------------------------------- */

interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    icon,
    title,
    subtitle,
}) => {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            sx={{
                mb: 3,
                alignItems: "flex-start",
            }}
        >

            <Box
                sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    bgcolor: "primary.50",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 700,
                        color: "#172033",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {subtitle}
                </Typography>
            </Box>
        </Stack>
    );
};

export default CreateComplaint;