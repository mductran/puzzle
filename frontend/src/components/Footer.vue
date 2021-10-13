<template>
    <div class="footer" id="footer">
        <v-footer padless color="rgb(255, 255, 255, 0.2)">
            <v-container>
                <v-row no-gutter>
                    <v-col id="col-logo">
                        <v-img contain src="../assets/thuzzle-logo.png" :height="0.1 * $vuetify.breakpoint.height" :width="0.1 * $vuetify.breakpoint.width"></v-img>
                    </v-col>

                    <v-col id="col-info">
                        <v-card class="footer-card" color="transparent" flat>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title>About Us</v-list-item-title>
                                    <v-list-item-subtitle>thuzzle.com</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col>

                    <v-col id="col-policy">
                        <v-card class="footer-card" color="transparent" flat>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title>Policies</v-list-item-title>
                                    <v-list-item-subtitle>Delivery</v-list-item-subtitle>
                                    <v-list-item-subtitle>Return and Exchange</v-list-item-subtitle>
                                    <v-list-item-subtitle>Terms and Conditions</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col>

                    <v-col id="col-contacts">
                        <v-card class="footer-card" color="transparent" flat>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title>Contacts</v-list-item-title>
                                    <v-list-item-subtitle>Thi's Puzzle Store</v-list-item-subtitle>
                                    <v-list-item-subtitle>Address</v-list-item-subtitle>
                                    <v-list-item-subtitle>Phone</v-list-item-subtitle>
                                    <v-list-item-subtitle>Email</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <p id="trademark"><a href="localhost:8080">© 2021 thuzzle.com</a>. All Rights Reserved</p>
                </v-row>
            </v-container>
        </v-footer>
    </div>
</template>

<style>
@import "../assets/styles/footer.css";
</style>
