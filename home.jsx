import React, { useState, useEffect, useMemo } from 'react';
import {
  CssBaseline, Box, Button, Card, CircularProgress, Stack, TextField, Typography,
  Snackbar, Link
} from '@mui/material';
import { AccountBalance, Sell, BarChart } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Cookies from 'js-cookie';

const Home = (props) => {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(systemPrefersDark ? 'dark' : 'light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const [formData, setFormData] = useState({ comment: '', file: null });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({ open: false, message: '' });

  const handleClose = () => setOpen({ open: false, message: '' });

  useEffect(() => {
    const savedMode = localStorage.getItem('app-theme-mode');
    setMode(savedMode || (systemPrefersDark ? 'dark' : 'light'));
  }, [systemPrefersDark]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'file') {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('comment', formData.comment);
    data.append('file', formData.file);

    fetch(`${props.host}/upload`, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          props.screen('result', data.file)
        } else {
          setOpen({ open: true, message: data.error });
        }
        setLoading(false);
      })
      .catch(() => {
        setOpen({ open: true, message: "Internal Error" });
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          px: 2,
        }}
      >
        <Stack
          width="100%"
          maxWidth="1100px"
          direction={{ xs: 'column-reverse', md: 'row' }}
          spacing={{ xs: 4, sm: 8 }}
        >
          {/* Left Info Section */}
          <Stack sx={{ maxWidth: 400, alignSelf: 'center' }} spacing={3}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              Munashe's Gov App
            </Typography>
            {[
              {
                icon: <AccountBalance />,
                title: "Open Government",
                desc: "Access Government policy documents processed and analysed.",
              },
              {
                icon: <BarChart />,
                title: "Analysis",
                desc: "Analyze governement policy documents on your own and ask questions.",
              },
              {
                icon: <Sell />,
                title: "NLP Uses case",
                desc: "View this app as a quick use case for natural langauge processing technology.",
              },
            ].map((item, idx) => (
              <Stack key={idx} direction="row" spacing={2}>
                {item.icon}
                <div>
                  <Typography fontWeight="medium">{item.title}</Typography>
                  <Typography color="text.primary">{item.desc}</Typography>
                </div>
              </Stack>
            ))}
          </Stack>

          {/* Upload Form Card */}
          <Card
            variant="outlined"
            sx={{
              alignSelf: 'center',
              maxWidth: 700,
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
                Munashe's Gov App
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Upload policy document
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="file"
                name="file"
                inputProps={{ accept: '.pdf,.docx' }}
                onChange={handleChange}
                margin="normal"
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Comment/Question"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                multiline
                maxRows={4}
              />
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
                Analyse
              </Button>
            </form>
            <Box mt={2} textAlign="center">
              <Typography>
                This app is part of{' '}
                <Link href="/register" underline="hover" color="primary">
                  Munashe Masiyiwa's
                </Link>{' '}
                dissertation
              </Typography>
            </Box>
          </Card>
        </Stack>

        {loading && (
          <Box sx={{ zIndex: 2000 }}>
            <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%' }} />
          </Box>
        )}
        <Snackbar open={open.open} autoHideDuration={5000} onClose={handleClose} message={open.message} />
      </Box>
    </ThemeProvider>
  );
};

export default Home;