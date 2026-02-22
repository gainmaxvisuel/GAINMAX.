const SUPABASE_URL = "https://hgtocdujbusilyfycxvx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhndG9jZHVqYnVzaWx5ZnljeHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3Njc2MTAsImV4cCI6MjA4NzM0MzYxMH0.MKmNXPIX3lrJK8S2Vfm20wEOaDhvjBMag8CUQVebglE";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const dashboard = document.getElementById("dashboard");

function showRegister() {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
}

function showLogin() {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
}

async function register() {
  const nom = document.getElementById("register-nom").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const ref = document.getElementById("register-ref").value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nom: nom,
        ref_code: ref || null
      }
    }
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Compte créé !");
    showLogin();
  }
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    document.getElementById("user-email").innerText = data.user.email;
    loginSection.classList.add("hidden");
    dashboard.classList.remove("hidden");
  }
}

async function logout() {
  await supabase.auth.signOut();
  dashboard.classList.add("hidden");
  loginSection.classList.remove("hidden");
}