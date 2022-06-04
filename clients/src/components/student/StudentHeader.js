import React from "react";

export default function StudentHeader() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a
                class="nav-link active"
                aria-current="page"
                href="/student/topic/list"
              >
                ____ Topic List
              </a>
              <a class="nav-link" href="/admin/topic/list">
                _____ Admin Topic List
              </a>
              <a class="nav-link" href="/admin/topic/">
                _____ Register Toic
              </a>
              <a
                class="nav-link disabled"
                href="/Student/Group/Registration"
                tabindex="-1"
                aria-disabled="true"
              >
                ____ Registr Group
              </a>
              <a
                class="nav-link disabled"
                href="/Student/MyGroup/:id"
                tabindex="-1"
                aria-disabled="true"
              >
                ___ My Group
              </a>
              <a
                class="nav-link disabled"
                href="/Student/MutualStudent"
                tabindex="-1"
                aria-disabled="true"
              >
                _____Mutual
              </a>
              <a
                class="nav-link disabled"
                href="/admin/Group/list"
                tabindex="-1"
                aria-disabled="true"
              >
                ______ GroupList
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
